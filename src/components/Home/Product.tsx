import React from "react";
import { Col, Card, Form } from "react-bootstrap";
import { Product as ProductType } from "../../../types";

type Props = {
  product: ProductType;
  // updateDeleteProducts: (selectedId: number) => void;
};

const Product = ({
  product,
}: // updateDeleteProducts
Props) => {
  return (
    <Col xs={12} md={6} lg={4}>
      <Card
        bg="white"
        text="dark"
        style={{ width: "18rem" }}
        className="mb-2 m-auto"
      >
        <Card.Header className="d-flex bg-white border-0">
          <input
            type="checkbox"
            className="delete-checkbox"
            // onClick={() => updateDeleteProducts(product.id)}
            id={String(product.id)}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{product.sku}</Card.Title>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.price} $ </Card.Text>
          <Card.Text>
            {product.label.replace(/_\w+/g, "")}: {product.vals} {product.unit}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
