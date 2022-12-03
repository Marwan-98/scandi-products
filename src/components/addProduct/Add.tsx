import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  Container,
  Nav,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import Layout from "./Layout";
import Book from "./Book";
import Dvd from "./Dvd";
import Furniture from "./Furniture";

type Props = {};

const Add = (props: Props) => {
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
      fetch("https://scandi-products-api.000webhostapp.com/", {
        method: "POST",
        body: JSON.stringify({
          sku: values.sku,
          name: values.name,
          price: values.price,
          height: values.height,
          width: values.width,
          length: values.length,
          type: values.type,
          size: values.size,
          weight: values.weight,
        }),
      })
        .then(function (response) {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          return navigate("/");
        })
        .catch((error) => {
          console.log(error);
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