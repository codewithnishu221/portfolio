package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AIService {

    private final RestTemplate restTemplate;

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    @Value("${groq.api-url}")
    private String apiUrl;

    public AIService() {
        this.restTemplate = new RestTemplate();
    }

    @SuppressWarnings("unchecked")
    public String chat(String userMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = Map.of(
            "model", model,
            "messages", List.of(
                Map.of("role", "user", "content", userMessage)
            )
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
            apiUrl, HttpMethod.POST, request,
            new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        return Optional.ofNullable(response.getBody())
            .map(body -> (List<Map<String, Object>>) body.get("choices"))
            .filter(choices -> !choices.isEmpty())
            .map(choices -> (Map<String, Object>) choices.get(0).get("message"))
            .map(message -> (String) message.get("content"))
            .orElse("Sorry, I couldn't generate a response.");
    }
}
