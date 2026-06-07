package com.portfolio.controller;

import com.portfolio.dto.ChatRequest;
import com.portfolio.dto.ChatResponse;
import com.portfolio.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        try {
            String response = aiService.chat(request.getMessage());
            return ResponseEntity.ok(new ChatResponse(response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ChatResponse("Error: " + e.getMessage()));
        }
    }
}
