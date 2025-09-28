<?php
header('Content-Type: application/json');

$filename = 'goals_log.json';
$goals = [];

// Read the file if it exists
if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $goals = json_decode($json, true);
    if (!is_array($goals)) $goals = [];
}

// Return JSON
echo json_encode($goals, JSON_PRETTY_PRINT);
