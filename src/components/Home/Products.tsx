import React from "react";
import { Row } from "react-bootstrap";
import Product from "./Product";
import { Product as ProductType } from "../../../types";

type Props = {
  products: ProductType[];
  updateDeleteProducts: (selectedId: number) => void;
};

const Products = ({ products, updateDeleteProducts }: Props) => {
  return (
    <main className="p-4">
      <Row>
        {products.map((product: ProductType) => (
          <Product
            product={product}
            key={product.id}
            updateDeleteProducts={updateDeleteProducts}
          />
        ))}
      </Row>
    </main>
  );
};

export default Products;
