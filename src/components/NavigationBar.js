import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Products from "./Products";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CategoryPiechart from "./CategoryPiechart";

const NavigationBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(res.data);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  return (
    <>
      <Navbar style={{ backgroundColor: "#6CB4EE" }}>
        <Container>
          <Nav className="me-auto"></Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Form.Select onChange={handleSelect}>
                <option default value="all">
                  All Categories
                </option>
                {categories.map((item, index) => (
                  <option value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="my-5"></div>
      <Products category={selectedCategory} products={products} />
      <button
        className="my-3 mx-5 py-2 px-3"
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: "999999",
          border: "none",
          backgroundColor: "#6CB4EE",
          borderRadius: "10px",
          color: "white",
        }}
        onClick={handleShow}
      >
        Analyse
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pie Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryPiechart products={products} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
