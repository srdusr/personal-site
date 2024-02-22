<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

    // Sender and recipient
    $sender = "example@email.com";
    $recipient = "trevorgray@srdusr.com";

    // Email subject and body
    $subject = "New Contact Form Submission from $name";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Message:\n$message\n";

    // Headers
    $headers = "From: $name <$email>";

    // Attempt to send email
    if (mail($recipient, $subject, $email_body, $headers)) {
        // Email sent successfully
        echo json_encode(array("status" => "success", "message" => "Email sent successfully!"));
    } else {
        // Error sending email
        echo json_encode(array("status" => "error", "message" => "An error occurred. Please try again later."));
    }
} else {
    // Not a POST request, redirect to contact page
    header("Location: contact.html");
    exit();
}
?>
