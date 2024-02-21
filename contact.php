<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the Composer autoload file
require_once __DIR__ . '/vendor/autoload.php';

// Check if the form is submitted
if (isset($_POST['name']) && isset($_POST['mail']) && isset($_POST['message'])) {
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
        $mail->SMTPAuth = false; // Disable SMTP authentication
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

         // Echo 'success' if the email was sent successfully
         echo 'success';
    } catch (Exception $e) {
        // An error occurred. Display the error message
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}
?>
