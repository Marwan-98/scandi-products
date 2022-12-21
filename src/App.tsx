import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./components/Home/Layout";
import Products from "./components/Home/Products";

function App() {
  const [products, setProducts] = useState([]);
  const [deleteProducts, setDeleteProducts] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("https://scandi-products-api.000webhostapp.com/")
      .then((res) => {
        setProducts(() => res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateDeleteProducts = (selectedId: number) => {
    if (!deleteProducts.includes(selectedId)) {
      setDeleteProducts((ids) => [...ids, selectedId]);
    } else {
      setDeleteProducts((ids) => ids.filter((id) => selectedId !== id));
    }
  };

  const massDelete = () => {
    axios
      .post(
        "https://scandi-products-api.000webhostapp.com/",
        JSON.stringify({
          ids: deleteProducts,
        })
      )
      .then((res) => {
        setProducts(() => res.data);
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
