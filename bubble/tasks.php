<?php
// tasks.php - PHP backend for to-do list

// 1. Set response type to JSON
// header('Content-Type: application/json');
header('Content-Type: application/json');
// 2. Load or create the tasks.json file
$filename = 'tasks.json';
// $filename = 'tasks.json';
// If file doesn't exist, create it as an empty array
if(!file_exists($filename)) {
    file_put_contents($filename, json_encode([]));
}
// 3. Read tasks from tasks.json into a PHP array
$tasks = json_decode(file_get_contents($filename), true);
// 4. Get the requested action from POST or GET (add, delete, toggle, reorder, list)
$action = $_POST['action'] ?? $_GET['action'] ?? 'list';
// 5. Helper function to save tasks back to tasks.json
function saveTasks($tasks, $filename){
    file_put_contents($filename, json_encode($tasks));
}

// 'list': Return all tasks as JSON
if ($action === 'list') {
    echo json_encode($tasks);
    exit;
}

// 'add': Add a new task (if less than 3), save, return updated tasks
if ($action === 'add') {
    if (count($tasks) >= 3) {
        echo json_encode(['error' => 'Max 3 tasks']);
        exit;
    }
    $name = trim($_POST['name'] ?? '');
    if ($name) {
        $tasks[] = ['name' => $name, 'done' => false];
        saveTasks($tasks, $filename);
        echo json_encode($tasks);
        exit;
    }
}

// 'delete': Remove a task by index, save, return updated tasks
if ($action === 'delete') {
    $idx = intval($_POST['idx'] ?? -1);
    if (isset($tasks[$idx])) {
        array_splice($tasks, $idx, 1);
        saveTasks($tasks, $filename);
        echo json_encode($tasks);
        exit;
    }
}

// 'toggle': Mark a task as done/undone, save, return updated tasks
if ($action === 'toggle') {
    $idx = intval($_POST['idx'] ?? -1);
    if (isset($tasks[$idx])) {
        $tasks[$idx]['done'] = !$tasks[$idx]['done'];
        saveTasks($tasks, $filename);
        echo json_encode($tasks);
        exit;
    }
}

// 'reorder': Move a task from one position to another, save, return updated tasks
if ($action === 'reorder') {
    $from = intval($_POST['from'] ?? -1);
    $to = intval($_POST['to'] ?? -1);
    if (isset($tasks[$from]) && isset($tasks[$to])) {
        $moved = $tasks[$from];
        array_splice($tasks, $from, 1);
        array_splice($tasks, $to, 0, [$moved]);
        saveTasks($tasks, $filename);
        echo json_encode($tasks);
        exit;
    }
}

// 7. If action is invalid, return an error message as JSON
echo json_encode(['error' => 'Invalid action']);
