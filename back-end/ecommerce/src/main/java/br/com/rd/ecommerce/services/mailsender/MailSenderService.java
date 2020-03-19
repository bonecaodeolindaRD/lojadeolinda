package br.com.rd.ecommerce.services.mailsender;

public interface MailSenderService {

    String sendMail(String to, String from, String text, String subject);

}
