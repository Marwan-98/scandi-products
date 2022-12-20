<?php

namespace App\Product;

class Dvd extends Product
{
    private $attribute_id = 1;
    protected $product;
    
    public function __construct($product)
    {
        $this->product = $product;
    }

    public function insert($size) {
        if (empty($size)) {
            http_response_code(400);
            echo "Size is missing";
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
            $stmt->bindParam(':value', $size);
            $stmt->execute();

            http_response_code(201);

            echo json_encode([
                "message" => "Product Created",
                "id" => (int) $id
            ]);
        }
    }

}
