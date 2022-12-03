<?php

use App\Database\Database;
use App\Product\Product;
use App\Product\ProductController;

require_once('vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

header("Content-type: application/json; charset=UTF-8");

$database = new Database();

$database->connect();

$product = new Product($database);

$controller = new ProductController($product);

$result = $controller->processRequest($_SERVER["REQUEST_METHOD"]);

