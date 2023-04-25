<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$request = json_decode(file_get_contents('php://input'));

$apiKey = 'yesguy1';
$storeId = 'store1';
$checkoutId = 'chkt8GMAZtore1';
$environment = 'qa';
$url = 'https://gatewayt.moneris.com/chktv2/request/request.php';

$apiRequest = [
    'store_id' => $storeId,
    'api_token' => $apiKey,
    'checkout_id' => $checkoutId,
    'txn_total' => $request->total,
    'environment' => $environment,
    'action' => 'preload',
    'language' => 'en'
];

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($apiRequest));
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($curl);

curl_close($curl);

header('Content-type: application/json');
echo $response;