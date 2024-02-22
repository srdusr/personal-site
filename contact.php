<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Include PHPMailer autoloader

// Email settings
$senderEmail = 'trevorgray@srdusr.com';
$recipientEmail = 'trevorgray@srdusr.com';
$subject = 'Message subject';
$messageContent = 'Hello, world!';

// Create an instance of PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = '127.0.0.1'; // SMTP host
    $mail->SMTPAuth = false;
    $mail->Port = 1025;

    // Sender and recipient settings
    $mail->setFrom($senderEmail);
    $mail->addAddress($recipientEmail);

    // Email content
    $mail->isHTML(false); // Set email format to plain text
    $mail->Subject = $subject;
    $mail->Body = $messageContent;

    // Send the email
    $mail->send();
    echo 'Email sent successfully!';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
