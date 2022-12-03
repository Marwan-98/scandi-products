<?php

namespace App\Product;

class Book extends Product
{
    protected $product;
    
    public function __construct($product)
    {
        $this->product = $product;
    }

    public function setProduct($sku, $name, $price, $_, $weight)
    {
        $sql = "INSERT INTO products (sku, name, price) VALUES (?,?,?)";
        $stmt = $this->product->connection->prepare($sql);
        $stmt->execute([$sku, $name, $price]);
        $id = $this->product->connection->lastInsertId();

        $sql = "INSERT INTO vals (product_id, attribute_id, value) VALUES (?,?,?)";
        $stmt = $this->product->connection->prepare($sql);
        $stmt->execute([$id, 2, $weight]);

        echo json_encode([
            "message" => "Product Created",
            "id" => (int) $id
        ]);
        exit;
    }
}