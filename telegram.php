<?php

$email = trim($_POST['user-email'] ?? '');
$phone = trim($_POST['user-phone'] ?? '');
$brand = trim($_POST['user-brand'] ?? '');
$message = trim($_POST['user-message'] ?? '');

// Validation
if (empty($email) || empty($phone) || empty($brand) || empty($message)) {
    echo "Please fill in all required fields.";
    exit;
}

$token = "7926372006:AAFwSNh_ZuX6mVF5qFblSmISUoZubIsKsho";
$chat_id = "-1002745473526";

$txt = "Email: $email\nPhone: $phone\nBrand name: $brand\nMessage: $message";

// URL Telegram API
$url = "https://api.telegram.org/bot{$token}/sendMessage";

// Данные для POST запроса
$data = [
    'chat_id' => $chat_id,
    'text' => $txt,
];

// Инициализация curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code == 200) {
    header('Location: index.html');
    exit;
} else {
    echo "Failed to send message. HTTP code: $http_code\n";
    echo "Response: $response";
}
?>