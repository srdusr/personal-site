<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all form fields are set
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        // Sanitize user input to prevent XSS attacks
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        // Set up email parameters
        $to = "your_email@example.com"; // Change this to your email
        $subject = "Contact Form Submission";
        $body = "Name: " . $name . "\n";
        $body .= "Email: " . $email . "\n";
        $body .= "Message: " . $message;

        // Headers
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Attempt to send the email
        if (mail($to, $subject, $body, $headers)) {
            // Email sent successfully
            echo "success";
        } else {
            // Error sending email
            echo "error";
        }
    } else {
        // Not all form fields are set
        echo "error";
    }
} else {
    // If not a POST request, do nothing (or you can handle other request methods)
    echo "error";
}
?>
