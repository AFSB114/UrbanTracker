package com.sena.urbantracker.monitoring.infrastructure.controller;

import com.sena.urbantracker.monitoring.application.dto.response.CoordinatesResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/monitoring")
public class MonitoringController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/coordinates/{routeName}")
    public ResponseEntity<CoordinatesResponseDto> getCoordinates(@PathVariable String routeName) {
        // Valores fijos para prueba, mismo formato que WebSocket
        CoordinatesResponseDto coordinates = new CoordinatesResponseDto(new BigDecimal("-74.08175"), new BigDecimal("4.60971"));

        // Publicar al tópico WebSocket
        messagingTemplate.convertAndSend("/topic/route/" + routeName + "/coordinates", coordinates);
        System.out.println("REST: Enviando coordenadas vía WebSocket para ruta: " + routeName);

        return ResponseEntity.ok(coordinates);
    }
}