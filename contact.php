<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'vendor/autoload.php';

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$recipient = $_ENV['RECIPIENT_EMAIL'];
$subject = 'Contact Form Submission';
$sender = $_ENV['SENDER_EMAIL'];

$mail = new PHPMailer(true);

// Check if the script is accessed through a POST request or command line
if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST" || !empty($argv)) {
    $email_error = $name_error = "";

    // Check if arguments were passed through the command line
    if (!empty($argv)) {
        if (count($argv) < 4) {
            exit("Usage: php contact.php name email message\n");
        }
        $name = $argv[1];
        $email = $argv[2];
        $message = $argv[3];
    } else {
        $name = test_input($_POST["name"]);
        $email = test_input($_POST["email"]);
        $message = test_input($_POST["message"]);

        if (empty($email)) {
            $email_error = "Email is required";
        } else {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $email_error = "Invalid email format";
            }
        }

        if (empty($name)) {
            $name_error = "Name is required";
        } else {
            if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
                $name_error = "Only letters and white space allowed";
            }
        }
    }

    // Send email if no errors
    if (empty($email_error) && empty($name_error)) {
        try {
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->Port = $_ENV['SMTP_PORT'];
            $mail->SMTPAuth   = true;
            $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
            $mail->Username   = $_ENV['SMTP_USERNAME'];
            $mail->Password   = $_ENV['SMTP_PASSWORD'];
            // Set SMTP Options
            if (isset($_ENV['SMTP_OPTIONS'])) {
                $smtpOptions = json_decode($_ENV['SMTP_OPTIONS'], true);
                $mail->SMTPOptions = $smtpOptions;
            }
            $mail->SMTPDebug = 0; // Disable debugging
            $mail->setFrom($sender);
            $mail->addAddress($recipient);
            $mail->Subject = $subject;
            $mail->Body = "Name: " . $name . "\n" . "Email: " . $email . "\n" . "Message: " . $message;
            $mail->send();

            // Send JSON response on success
            http_response_code(200);
            echo json_encode(array("message" => "Email sent successfully."));
            exit;
        } catch (Exception $e) {
            // Send JSON response on error
            http_response_code(500);
            echo json_encode(array("message" => "An error occurred. Email not sent. Error: " . $mail->ErrorInfo));
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Error: Please check the form for errors."));
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "This script is intended to be used with POST requests or command line arguments."));
    exit;
}

// Function to sanitize input data
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
