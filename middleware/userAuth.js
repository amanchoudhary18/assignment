require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const Session = require("../models/session.model");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the session by token and user ID
    const session = await Session.findOne({
      user: decoded.userId,
      token,
    });

    if (!session) {
      throw new Error();
    }

    req.token = token;
    req.userId = decoded.userId;
    req.sessionId = session._id;
    next();
  } catch (error) {
    res.status(401).send({ status: "Failed", message: "Please Authenticate" });
  }
};

module.exports = { userAuth, generateToken };
