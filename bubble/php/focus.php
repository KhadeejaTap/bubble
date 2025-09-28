<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
if(!$data || !isset($data['date']) || !isset($data['seconds'])){
    http_response_code(400);
    echo "Invalid data";
    exit;
}

$file = 'session_log.json';
$sessions = [];

if (file_exists($file)) {
    $json = file_get_contents($file);
    $sessions = json_decode($json, true);
    if (!is_array($sessions)) $sessions = [];
}

// either append new day or add to existing day's total
$found = false;
foreach ($sessions as &$session) {
    if ($session['date'] === $data['date']) {
        $session['seconds'] += $data['seconds'];
        $found = true;
        break;
    }
}

if (!$found) {
    $sessions[] = [
        'date'    => $data['date'],
        'seconds' => $data['seconds']
    ];
}

file_put_contents($file, json_encode($sessions, JSON_PRETTY_PRINT));
echo json_encode(["status" => "ok", "date" => $data['date']]);
