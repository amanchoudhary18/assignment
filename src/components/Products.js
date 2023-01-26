import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Products.css";
import Product from "./Product";

const Products = (props) => {
  console.log(props.category);
  const filteredProducts =
    props.category === "all"
      ? props.products
      : props.products.filter((product) => product.category === props.category);

  return (
    <div className="cards">
      {filteredProducts.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default Products;
