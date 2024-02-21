<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        // Create a PHPMailer instance
        $mail = new PHPMailer(true);

        try {
            // SMTP configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.yourmailserver.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'your_email@example.com'; // SMTP username
            $mail->Password = 'your_password'; // SMTP password
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 1025; // Port for TLS

            // Email content
            $mail->setFrom($email, $name);
            $mail->addAddress('trevorgray@srdusr.com');
            $mail->Subject = 'Contact Form Submission';
            $mail->Body = "Name: $name\nEmail: $email\nMessage: $message";

            // Send the email
            $mail->send();
            echo 'success';
        } catch (Exception $e) {
            echo "error: {$mail->ErrorInfo}";
        }
    } else {
        echo 'error: Missing fields';
    }
} else {
    echo 'error: Invalid request';
}
?>
