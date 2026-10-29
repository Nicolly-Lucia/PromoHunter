<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);

if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode(['erro' => 'Termo de busca vazio.']);
    exit;
}

$busca = urlencode(trim($_GET['q']));
$url = "https://www.cheapshark.com/api/1.0/games?title=" . $busca;

$response = @file_get_contents($url);

if ($response === FALSE) {
    echo json_encode(['erro' => 'Falha na conexão com a API']);
    exit;
}

echo $response;
?>