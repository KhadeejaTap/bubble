<?php
header('Content-Type: application/json');

$file = 'session_log.json';
$sessions = [];

if (file_exists($file)) {
    $json = file_get_contents($file);
    $sessions = json_decode($json, true);
    if (!is_array($sessions)) $sessions = [];
}

// return sessions
echo json_encode($sessions, JSON_PRETTY_PRINT);
