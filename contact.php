<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'localhost';  // or your SMTP server address
    $mail->SMTPAuth = false;     // change to true if SMTP authentication is required
    $mail->Port = 25;

    // Recipients
    $mail->setFrom('from@example.com', 'Mailer');
    $mail->addAddress('trevorgray@srdusr.com');

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'Test Email';
    $mail->Body = 'This is a test email';

    $mail->send();
    echo 'Email sent successfully';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
