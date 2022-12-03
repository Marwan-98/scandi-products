<?php

namespace App\Product;

class ProductController
{
    
    protected $product;
    
    public function __construct($product)
    {
        $this->product = $product;
    }

    public function processRequest(string $method)
    {
        switch ($method) {
            case ("GET"):
                echo $this->product->getProducts();
                exit;
            case ("POST"):
                $body = json_decode(file_get_contents('php://input'));
                if(isset($body->ids)) {
                    $body = json_decode(file_get_contents('php://input'));
                    echo $this->product->deleteProducts($body->ids);
                    exit;
                } else {
                    $class = __NAMESPACE__ . '\\'. $body->type;
                    $productType = new $class($this->product);
                    $this->product->checkDuplicate($body->sku);
                    http_response_code(201);
                    echo $productType->setProduct($body->sku, $body->name, $body->price, $body->size ?? null, $body->weight ?? null, $body->height ?? null, $body->width ?? null, $body->length ?? null);
                    exit;
                }
        }
    }
}
