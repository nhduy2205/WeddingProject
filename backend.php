<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data_file = 'data.txt';

function read_data($file) {
    if (!file_exists($file)) {
        return [];
    }
    return file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}

function write_data($file, $new_data) {
    if (!is_writable($file)) {
        echo json_encode(['success' => false, 'message' => 'File is not writable.']);
        exit;
    }
    file_put_contents($file, $new_data . PHP_EOL, FILE_APPEND);
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'get_data') {
    // Get data from the file
    $data = read_data($data_file);
    echo json_encode($data);
} elseif ($action === 'submit_data' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST data
    $new_data = isset($_POST['data']) ? trim($_POST['data']) : '';
    
    if (empty($new_data)) {
        echo json_encode(['success' => false, 'message' => 'No data provided.']);
        exit;
    }

    // Write the new data to the file
    write_data($data_file, $new_data);

    // Get updated data from the file
    $data = read_data($data_file);
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action.']);
}
?>