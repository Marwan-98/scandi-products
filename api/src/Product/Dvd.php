<?php

namespace App\Product;

class Dvd extends Product
{
    protected $product;
    
    public function __construct($product)
    {
        $this->product = $product;
    }

    public function setProduct($sku, $name, $price, $size)
    {
        $sql = "INSERT INTO products (sku, name, price) VALUES (?,?,?)";
        $stmt = $this->product->connection->prepare($sql);
        $stmt->execute([$sku, $name, $price]);
        $id = $this->product->connection->lastInsertId();

        $sql = "INSERT INTO vals (product_id, attribute_id, value) VALUES (?,?,?)";
        $stmt = $this->product->connection->prepare($sql);
        $stmt->execute([$id, 1, $size]);

        echo json_encode([
            "message" => "Product Created",
            "id" => $id
        ]);
        exit;
    }
}
