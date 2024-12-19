<?php
header('Access-Control-Allow-Origin: *');  // Cho phép tất cả các domain
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Cho phép phương thức GET, POST, OPTIONS
header('Access-Control-Allow-Headers: Content-Type'); // Cho phép header Content-Type
header('Content-Type: application/json');
// Xử lý yêu cầu OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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
    // Kiểm tra xem file có thể ghi được không
    if (!is_writable($file)) {
        echo json_encode(['success' => false, 'message' => 'File is not writable.']);
        exit;
    }
    file_put_contents($file, $new_data . PHP_EOL, FILE_APPEND);
}

// Kiểm tra action
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'get_data') {
    // Lấy dữ liệu từ file
    $data = read_data($data_file);
    echo json_encode($data);
} elseif ($action === 'submit_data' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Nhận và xử lý dữ liệu POST
    echo("sdsdsdsd");
    $new_data = isset($_POST['data']) ? trim($_POST['data']) : '';
    if (empty($new_data)) {
        echo json_encode(['success' => false, 'message' => 'No data provided.']);
        exit;
    }

    // Viết dữ liệu vào file
    write_data($data_file, $new_data);

    // Lấy lại dữ liệu sau khi đã thêm
    $data = read_data($data_file);
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action.']);
}
?>