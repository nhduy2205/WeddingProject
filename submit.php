<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);

    // Prepare data to be written to the text file
    $data = "Name: $name, Email: $email\n";

    // Open the file in append mode, create it if it doesn't exist
    $file = fopen("data.txt", "a");

    if ($file) {
        // Write data to the file
        fwrite($file, $data);
        fclose($file);
        echo "Data has been saved!";
    } else {
        echo "Unable to open the file.";
    }
} else {
    echo "Invalid request.";
}
?>