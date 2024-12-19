<?php
header('Access-Control-Allow-Origin: *');  // Cho phép tất cả các domain
header('Access-Control-Allow-Methods: GET, POST'); // Cho phép phương thức GET và POST
header('Access-Control-Allow-Headers: Content-Type'); // Cho phép header Content-Type

// Tiếp tục với các mã xử lý của bạn...
$data_file = 'data.txt';

// Hàm đọc dữ liệu từ file
function read_data($file) {
    if (!file_exists($file)) {
        return [];
    }
    return file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}

// Hàm ghi dữ liệu vào file
function write_data($file, $new_data) {
    file_put_contents($file, $new_data . PHP_EOL, FILE_APPEND);
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'get_data') {
    $data = read_data($data_file);
    echo json_encode($data);
} elseif ($action === 'submit_data' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_data = isset($_POST['data']) ? trim($_POST['data']) : '';
    if (empty($new_data)) {
        echo json_encode(['success' => false, 'message' => 'No data provided.']);
        exit;
    }
    write_data($data_file, $new_data);
    $data = read_data($data_file);
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action.']);
}
?>