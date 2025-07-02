<?php

/* https://api.telegram.org/bot7926372006:AAFwSNh_ZuX6mVF5qFblSmISUoZubIsKsho/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$email = $_POST['user-email'];
$phone = $_POST['user-phone'];
$brand = $_POST['user-brand'];
$message = $_POST['user-message'];
$token = "7926372006:AAFwSNh_ZuX6mVF5qFblSmISUoZubIsKsho";
$chat_id = "-4860921571";
$arr = array(
  'Email: ' => $email,
  'Phone: ' => $phone,
  'Brand name: ' => $grand,
  'message: ' => $message
);

$txt = "<b>BASIC</b>%0A"; // Добавляем "BASIC" вручную в текст
foreach ($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: index.html');
} else {
  echo "Error";
}
?>