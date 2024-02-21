<?php
$to = 'trevorgray@srdusr.com';
$subject = 'Test Email';
$message = 'This is a test email';
$headers = 'From: mailsec.protonmail.ch';

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully';
} else {
    echo 'Failed to send email';
}
?>
