<?php

namespace App\Product;

use App\Database\Database;

class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->connect();
    }

    public function checkDuplicate(string $sku)
    {
        $sql = 'SELECT * FROM products WHERE sku ="' . $sku . '"';
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch();

        if ($result) {
            http_response_code(403);
            echo "This SKU Already Exists";
            exit;
        }
    }

    public function setProduct($sku, $name, $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }

    public function getProducts()
    {
        $sql = 'SELECT products.id, products.sku, products.name, products.price, attributes.label, attributes.unit,
        GROUP_CONCAT(vals.value ORDER BY vals.id ASC SEPARATOR "x") AS vals 
        FROM products INNER JOIN vals ON products.id=vals.product_id 
        INNER JOIN attributes ON attributes.id=vals.attribute_id 
        GROUP BY products.id';

        $stmt = $this->connection->query($sql);
        $result = $stmt->fetchAll();

        http_response_code(200);
        return json_encode($result);
    }

    public function deleteProducts(array $ids)
    {
        $sql = "DELETE FROM products WHERE id IN (" . implode(",", $ids) . ")";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        $result = $this->getProducts();
        return $result;
    }
}
