<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$mark = $_POST['form_mark'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';                       // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'name'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'pass'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('ishenko@yesson.ru', 'Компания Meddig'); // от кого будет уходить письмо?
$mail->addAddress('ishenko@yesson.ru');     // Кому будет уходить письмо 
$mail->addAddress('u.chernenko@gmail.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Meddig: заявка на звонок от посетителя '.$name.'';
$mail->Body    =
'<p>Посетитель, представившийся как: <strong>'.$name.'</strong></p>
<p>оставил заявку, его телефон: <strong>'.$phone.'</strong></p>
<p>источник: <strong>'.$mark.'</strong></p>';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    return true;
}
?>