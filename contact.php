<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Validate input
    if (empty($name) || empty($email) || empty($message)) {
        logError('Incomplete form data');
        echo 'error';
        exit; // Stop script execution
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        logError('Invalid email format');
        echo 'error';
        exit; // Stop script execution
    }

    // Sanitize input
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

    // Validate and sanitize headers
    $name = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    // Set the recipient email address
    $to = 'trevorgray@srdusr.com';

    // Set the email subject
    $subject = 'New Contact Form Submission';

    // Set the email headers
    $headers = "From: " . $name . " <" . $email . ">" . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8" . "\r\n";

    // Compose the email body
    $body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Message:</strong> $message</p>
    ";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo 'success'; // Send a response back to main.js
    } else {
        logError('Failed to send email');
        echo 'error';
    }
}

function logError($message) {
    // Log the error message to a file or error log
    error_log('Contact form error: ' . $message, 0);
}
?>
