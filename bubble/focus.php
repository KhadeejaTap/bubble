<?php
if(isset($_POST['goal'], $_POST['seconds'])) {
    $logEntry = [
        'goal' => $_POST['goal'],
        'seconds' => (int)$_POST['seconds'],
        'timestamp' => date('Y-m-d H:i:s')
    ];

    $file = 'session_log.json';
    $data = [];

    if(file_exists($file)){
        $data = json_decode(file_get_contents($file), true);
    }

    $data[] = $logEntry;
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

