package br.com.rd.dashboard.services.mailsender;

import org.springframework.mail.MailSendException;

public interface MailSenderService {

    void sendMail(String to, String from, String text, String subject) throws MailSendException;

}
