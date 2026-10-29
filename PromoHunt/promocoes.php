<?php
header('Content-Type: application/json; charset=utf-8');
// Desativa a exibição de erros em HTML para não quebrar o JSON
error_reporting(0); 

$url = "https://www.cheapshark.com/api/1.0/deals?upperPrice=50&sortBy=Recent&pageSize=8";

// esconde o erro
$response = @file_get_contents($url);

if ($response === FALSE) {
    // caso falhe
    echo json_encode(['erro' => 'Falha na conexão com a API']);
    exit;
}

echo $response;
?>