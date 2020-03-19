package br.com.rd.ecommerce.services.mailsender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderServiceImpl implements MailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendMail(String to, String from, String text, String subject) throws MailSendException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(text);
        message.setTo(to);
        message.setFrom(from);
        message.setSubject(subject);

        try {
            mailSender.send(message);
        } catch (Exception e) {
            throw new MailSendException("Erro ao enviar o email");
        }
    }
}
