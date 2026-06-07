package com.portfolio.service;

import com.portfolio.dto.ContactMessageDTO;
import com.portfolio.entity.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository contactRepository;

    public ContactService(ContactMessageRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactMessage saveContactMessage(ContactMessageDTO dto) {
        ContactMessage message = new ContactMessage();
        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setMessage(dto.getMessage());
        return contactRepository.save(message);
    }
}
