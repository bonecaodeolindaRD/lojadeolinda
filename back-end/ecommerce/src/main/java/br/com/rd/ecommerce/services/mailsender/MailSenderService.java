package br.com.rd.ecommerce.services.mailsender;

import org.springframework.mail.MailSendException;

public interface MailSenderService {

    void sendMail(String to, String from, String text, String subject) throws MailSendException;

}
