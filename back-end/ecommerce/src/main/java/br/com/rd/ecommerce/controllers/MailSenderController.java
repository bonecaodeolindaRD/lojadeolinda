package br.com.rd.ecommerce.controllers;


import br.com.rd.ecommerce.services.mailsender.MailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailSenderController {
    @Autowired
    private MailSenderService mailSenderService;

    @PostMapping("/mail/send")
    public void sendemail(){
        mailSenderService.sendMail("","","","");
    }
}
