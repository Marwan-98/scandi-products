<?php

namespace App\Product;

class Furniture extends Product
{
    protected $product;
    
    public function __construct($product)
    {
        $this->product = $product;
    }

    public function setProduct($sku, $name, $price, $_, $__, $height, $width, $length)
    {
        $sql = "INSERT INTO products (sku, name, price) VALUES (?,?,?)";
        $stmt = $this->product->connection->prepare($sql);
        $stmt->execute([$sku, $name, $price]);
        $id = $this->product->connection->lastInsertId();

        $sql = "INSERT INTO vals (product_id, attribute_id, value) VALUES (?,?,?),(?,?,?),(?,?,?)";
        $stmt = $this->product->connection->prepare($sql);
        $stmt->execute([$id, 3, $height, $id, 4, $width, $id, 5, $length]);

        echo json_encode([
            "message" => "Product Created",
            "id" => (int) $id
        ]);
        exit;
    }
}
