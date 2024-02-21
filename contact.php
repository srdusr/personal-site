<?php
$to = 'trevorgray@srdusr.com';
$subject = 'Test Email';
$message = 'This is a test email';
$headers = 'From: sender@example.com';

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully';
} else {
    echo 'Failed to send email';
}
?>
