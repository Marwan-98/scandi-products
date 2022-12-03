<?php

namespace App\Database;

class Database
{
    private  $host;
    private  $name;
    private  $user;
    private  $pwd;

    public function __construct()
    {
        $this->host = $_ENV['DB_HOST'];
        $this->name = $_ENV['DB_NAME'];
        $this->user = $_ENV['DB_USER'];
        $this->pwd = $_ENV['DB_PWD'];
    }

    public function connect(): \PDO
    {
        $dsn = "mysql:host={$this->host};dbname={$this->name};charset=utf8";
        $pdo = new \PDO($dsn, $this->user, $this->pwd);
        $pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        $pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);

        return $pdo;
    }
}
