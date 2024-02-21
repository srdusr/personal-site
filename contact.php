<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Adjust the path as necessary to match your Composer autoload file location

$mail = new PHPMailer(true); // Passing `true` enables exceptions

try {
    //Server settings
    $mail->SMTPDebug = 0; // Enable verbose debug output (0 = off, 1 = client messages, 2 = client and server messages)
    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = '127.0.0.1'; // Specify main and backup SMTP servers
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'username'; // SMTP username
    $mail->Password = 'password'; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 1025; // TCP port to connect to

    //Recipients
    $mail->setFrom('from@example.com', 'Mailer'); // Note: Specify your "from" email address and name
    $mail->addAddress('trevorgray@srdusr.com', 'Your Name'); // Add a recipient, Name is optional

    //Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'Email subject here';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>
