import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./components/Home/Layout";
import Products from "./components/Home/Products";

function App() {
  const [products, setProducts] = useState([]);
  // const [deleteProducts, setDeleteProducts] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("https://scandi-products-api.000webhostapp.com/")
      .then((res) => {
        setProducts(() => res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const updateDeleteProducts = (selectedId: number) => {
  //   if (!deleteProducts.includes(selectedId)) {
  //     setDeleteProducts((ids) => [...ids, selectedId]);
  //   } else {
  //     setDeleteProducts((ids) => ids.filter((id) => selectedId !== id));
  //   }
  // };

  const massDelete = () => {
    const checkboxes = document.getElementsByClassName("delete-checkbox");
    let selectedProducts = [];

    for (let i = 0; i < checkboxes.length; i++) {
      if ((checkboxes[i] as HTMLInputElement).checked) {
        selectedProducts.push(+checkboxes[i].id);
      }
    }
    if (selectedProducts.length > 0) {
      axios
        .post(
          "https://scandi-products-api.000webhostapp.com/",
          JSON.stringify({
            ids: selectedProducts,
          })
        )
        .then((res) => {
          setProducts(() => res.data);
          selectedProducts = [];
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="App container">
      <Layout massDelete={massDelete}>
        <Products
          products={products}
          // updateDeleteProducts={updateDeleteProducts}
        />
      </Layout>
    </div>
  );
}

export default App;
