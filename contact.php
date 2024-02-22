<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Email information
    $to = "trevorgray@srdusr.com"; // Change this to your email address
    $subject = "New Contact Form Submission";
    $headers = "From: $name <$email>";

    // Compose the email content
    $email_content = "You have received a new message from your website contact form.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "success"; // Send a success response back to JavaScript
    } else {
        echo "error"; // Send an error response back to JavaScript
    }
} else {
    // Not a POST request, so do nothing (or handle the error as needed)
    http_response_code(405); // Method Not Allowed
}
?>
