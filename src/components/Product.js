import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Product = (props) => {
  const [readMore, setReadMore] = useState(false);
  const extraContent = (
    <div>
      <p className="extra-content">{}</p>
    </div>
  );
  const linkName = readMore ? "...Read Less " : "...Read More ";
  const product = props.product;
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          style={{ height: "250px" }}
          src={product.image}
        />
        <Card.Body>
          <div className="my-4">
            <button
              className="py-1"
              style={{
                float: "right",
                border: "none",
                backgroundColor: "#6CB4EE",
                borderRadius: "10px",
              }}
            >
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </button>
          </div>

          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            {product.description.length > 150 ? (
              <div>
                {product.description.substring(0, 150)}
                {readMore && product.description.substring(150)}
                <button
                  className="read-more-link"
                  onClick={() => {
                    setReadMore(!readMore);
                  }}
                  style={{ background: "none", border: "none" }}
                >
                  <h6>{linkName}</h6>
                </button>
              </div>
            ) : (
              <p>{product.description}</p>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
