<?php

namespace App\Product;

class Book extends Product
{
    private $attribute_id = 2;

    protected $product;
    
    public function __construct($product)
    {
        $this->product = $product;
    }

    public function insert($_, $weight) {
        if (empty($weight)) {
            http_response_code(400);
            echo "Weight is missing";
        } else {
            $sql = "INSERT INTO products (sku, name, price) VALUES (:sku, :name, :price)";
            $stmt = $this->product->connection->prepare($sql);
            $stmt->bindParam(':sku', $this->product->sku);
            $stmt->bindParam(':name', $this->product->name);
            $stmt->bindParam(':price', $this->product->price);
            $stmt->execute();
            $id = $this->product->connection->lastInsertId();
            
            $sql = "INSERT INTO vals (product_id, attribute_id, value) VALUES (:product_id,:attribute_id,:value)";
            $stmt = $this->product->connection->prepare($sql);
            $stmt->bindParam(':product_id', $id);
            $stmt->bindParam(':attribute_id', $this->attribute_id);
            $stmt->bindParam(':value', $weight);
            $stmt->execute();

            http_response_code(201);

            echo json_encode([
                "message" => "Product Created",
                "id" => (int) $id
            ]);
        }
    }
}
