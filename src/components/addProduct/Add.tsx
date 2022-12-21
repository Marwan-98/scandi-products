import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Alert } from "react-bootstrap";
import Layout from "./Layout";
import Book from "./Book";
import Dvd from "./Dvd";
import Furniture from "./Furniture";
import axios from "axios";

type Props = {};

const Add = (props: Props) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      sku: "",
      name: "",
      price: "",
      type: "",
      size: "",
      height: "",
      width: "",
      length: "",
      weight: "",
    },
    onSubmit: (values) => {
      axios
        .post(
          "https://scandi-products-api.000webhostapp.com/",
          JSON.stringify({
            sku: values.sku,
            name: values.name,
            price: values.price,
            height: values.height,
            width: values.width,
            length: values.length,
            type: values.type,
            size: values.size,
            weight: values.weight,
          })
        )
        .then(() => {
          return navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setTimeout(() => setError(""), 2000);
        });
    },
  });

  type compObj = { [key: string]: JSX.Element };

  const TypeForm: compObj = {
    "Book": <Book formik={formik} />,
    "Furniture": <Furniture formik={formik} />,
    "Dvd": <Dvd formik={formik} />,
  };

  return (
    <div className="App container">
      <Layout>
        <main className="p-4 text-start">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            className="d-flex flex-column align-items-start"
            style={{ width: "50%" }}
            id="product_form"
            onSubmit={formik.handleSubmit}
          >
            <Form.Group
              className="mb-3 d-inline-flex align-items-center justify-content-between"
              style={{ minWidth: "100%" }}
            >
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                id="sku"
                name="sku"
                value={formik.values.sku}
                onChange={formik.handleChange}
                style={{ maxWidth: "50%" }}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-inline-flex align-items-center justify-content-between"
              style={{ minWidth: "100%" }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                style={{ maxWidth: "50%" }}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-inline-flex align-items-center justify-content-between"
              style={{ minWidth: "100%" }}
            >
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                style={{ maxWidth: "50%" }}
                step="any"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-inline-flex align-items-center justify-content-between"
              style={{ minWidth: "100%" }}
            >
              <Form.Label>Type Switcher</Form.Label>
              <Form.Select
                style={{ maxWidth: "50%" }}
                id="productType"
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
                required
              >
                <option value={""}>Type Switcher</option>
                <option value={"Dvd"}>DVD</option>
                <option value={"Furniture"}>Furniture</option>
                <option value={"Book"}>Book</option>
              </Form.Select>
            </Form.Group>

            {formik.values.type && TypeForm[`${formik.values.type}`]}
          </Form>
        </main>
      </Layout>
    </div>
  );
};

export default Add;
