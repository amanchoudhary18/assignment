const express = require("express");
const User = require("../models/user.model");
const Session = require("../models/session.model");
const router = express.Router();
const { userAuth, generateToken } = require("../middleware/userAuth");

const SESSION_DELAY = 86400000;

// Function to delete a session after a specified delay
const deleteSessionAfterDelay = async (sessionId, delay) => {
  setTimeout(async () => {
    try {
      await Session.findByIdAndDelete(sessionId);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  }, delay);
};

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = generateToken(user._id);
    const session = new Session({ user: user._id, token });

    await session.save();

    deleteSessionAfterDelay(session._id, SESSION_DELAY);

    res.status(201).send({ status: "Successful", user, token });
  } catch (error) {
    res.status(400).send({ status: "Failed", error: error.message });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).send({
        status: "Failed",
        error: "Login failed. Check your credentials.",
      });
    }

    const token = generateToken(user._id);
    const session = new Session({ user: user._id, token });
    await session.save();

    deleteSessionAfterDelay(session._id, SESSION_DELAY);

    res.send({ status: "Successful", user, token });
  } catch (error) {
    res.status(400).send({ status: "Failed", error: error.message });
  }
});

// Get user details
router.get("/me", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    res.status(200).send({ status: "Successful", user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
});

// Logout the user by deleting the session
router.post("/logout", userAuth, async (req, res) => {
  try {
    const sessionId = req.sessionId;
    await Session.findByIdAndDelete(sessionId);

    res
      .status(200)
      .send({ status: "Successful", message: "Logout successful" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
});

module.exports = router;
