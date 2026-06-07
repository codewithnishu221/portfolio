package com.portfolio.controller;

import com.portfolio.dto.ContactMessageDTO;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> submitContactForm(@Valid @RequestBody ContactMessageDTO dto) {
        try {
            contactService.saveContactMessage(dto);
            return ResponseEntity.ok(new MessageResponse("Message received successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    public record MessageResponse(String message) {}
}
