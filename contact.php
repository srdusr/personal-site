<?php
// Include the PHPMailer autoload file
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // Retrieve form data
    $name = $_POST['name'];
    $mailFrom = $_POST['mail'];
    $message = $_POST['message'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Passing `true` enables exceptions

    try {
        // Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = '127.0.0.1'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = '$SMTP_USERNAME'; // SMTP username
        $mail->Password = '$SMTP_PASSWORD'; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 1025; // TCP port to connect to

        // Recipients
        $mail->setFrom($mailFrom, $name);
        $mail->addAddress('trevorgray@srdusr.com'); // Add a recipient

        // Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = 'Email from srdusr.com';
        $mail->Body = "You have received an e-mail from $name.\n\n$message";

        // Attempt to send the email
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        // An error occurred. Display the error message
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
    }
?>
