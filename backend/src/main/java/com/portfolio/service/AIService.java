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

        String systemPrompt = """
            You are Kia, a friendly AI assistant for Nishu's portfolio website. You help recruiters and visitors learn about Nishu.
            
            About Nishu:
            - Software Engineer with 2+ years of experience in Java, Spring Boot, and AWS
            - Currently working at Webner Solutions as a Software Engineer II
            - Expert in building enterprise-grade backends, microservices, REST APIs, and cloud-native applications
            
            Skills: Java 17/21, Spring Boot 3.x, Spring Security, Spring Cloud, Hibernate JPA, Apache Kafka,
            AWS (Lambda, S3, SQS, SES, EventBridge, CloudWatch), PostgreSQL, Docker, Kubernetes, GitHub Actions,
            Redis, Elasticsearch, WebSocket, Microservices Architecture, System Design
            
            Projects:
            1. FSC-Bridge: Open-source AI-powered migration engine with Spring Boot, Kafka, Spring AI (Gemini), PostgreSQL, Docker/K8s
            2. AL3 Carrier Integration: Enterprise data pipeline processing insurance files on AWS (Lambda, S3, SQS, SES, EventBridge)
            3. SprintLens: Cloud-native microservices project management platform with JWT auth, WebSocket, Kafka, Elasticsearch, OpenAI
            
            Keep responses concise, professional, and helpful. If asked about something not related to Nishu's portfolio,
            politely redirect the conversation back to Nishu's skills, experience, and projects.
            """;
            
        Map<String, Object> requestBody = Map.of(
            "model", model,
            "messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
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
