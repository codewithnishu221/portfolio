package com.portfolio.service;

import com.portfolio.dto.ContactMessageDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${MAIL_USERNAME}")
    private String fromEmail;

    @Value("${MAIL_TO:${MAIL_USERNAME}}")
    private String toEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactNotification(ContactMessageDTO dto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Portfolio Contact: " + dto.getName());
        message.setText("""
                New contact form submission:
                
                Name: %s
                Email: %s
                
                Message:
                %s
                """.formatted(dto.getName(), dto.getEmail(), dto.getMessage()));

        mailSender.send(message);
    }
}
