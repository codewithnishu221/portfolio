package com.portfolio.service;

import com.portfolio.dto.ContactMessageDTO;
import com.portfolio.entity.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository contactRepository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository contactRepository, EmailService emailService) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    public ContactMessage saveContactMessage(ContactMessageDTO dto) {
        ContactMessage message = new ContactMessage();
        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setMessage(dto.getMessage());
        ContactMessage saved = contactRepository.save(message);

        emailService.sendContactNotification(dto);

        return saved;
    }
}
