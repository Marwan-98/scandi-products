import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Card,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "./components/Home/Product";
import { Product as ProductType } from "../types";
import Layout from "./components/Home/Layout";
import Products from "./components/Home/Products";
import { json } from "stream/consumers";

function App() {
  const [products, setProducts] = useState([]);
  const [deleteProducts, setDeleteProducts] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://scandi-products-api.000webhostapp.com/", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(() => data);
      });
  }, []);

  const updateDeleteProducts = (selectedId: number) => {
    if (!deleteProducts.includes(selectedId)) {
      setDeleteProducts((ids) => [...ids, selectedId]);
    } else {
      setDeleteProducts((ids) => ids.filter((id) => selectedId !== id));
    }
  };

  const massDelete = () => {
    fetch("https://scandi-products-api.000webhostapp.com/", {
      method: "POST",
      body: JSON.stringify({
        ids: deleteProducts,
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
        setProducts(() => data);
        setDeleteProducts(() => []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App container">
      <Layout massDelete={massDelete}>
        <Products
          products={products}
          updateDeleteProducts={updateDeleteProducts}
        />
      </Layout>
    </div>
  );
}

export default App;
