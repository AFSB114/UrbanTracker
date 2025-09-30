package com.sena.urbantracker.monitoring.infrastructure.controller;

import com.sena.urbantracker.monitoring.application.dto.response.CoordinatesResponseDto;
import com.sena.urbantracker.monitoring.application.dto.RouteStatusDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Controller("")
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/coordinates/{routeName}")
    @SendTo("/topic/route/{routeName}/coordinates")
    public CoordinatesResponseDto getCoordinates(@DestinationVariable String routeName) {
        System.out.println("WebSocket funcionando: Solicitando coordenadas para ruta: " + routeName);
        // Valores fijos para prueba
        return new CoordinatesResponseDto(new BigDecimal("-74.08175"), new BigDecimal("4.60971"));
    }

    @MessageMapping("/status/{routeName}")
    @SendTo("/topic/route/{routeName}/status")
    public RouteStatusDto getStatus(@DestinationVariable String routeName) {
        System.out.println("WebSocket funcionando: Solicitando status para ruta: " + routeName);
        // Valores fijos para prueba
        return new RouteStatusDto("ACTIVE", OffsetDateTime.now());
    }

    // Método para publicar coordenadas desde el servidor
    public void sendCoordinates(String routeName, CoordinatesResponseDto coordinates) {
        System.out.println("WebSocket funcionando: Enviando coordenadas para ruta: " + routeName + " - " + coordinates);
        messagingTemplate.convertAndSend("/topic/route/" + routeName + "/coordinates", coordinates);
    }

    // Método para publicar status desde el servidor
    public void sendStatus(String routeName, RouteStatusDto status) {
        System.out.println("WebSocket funcionando: Enviando status para ruta: " + routeName + " - " + status);
        messagingTemplate.convertAndSend("/topic/route/" + routeName + "/status", status);
    }

    // Método para publicar telemetría desde el servidor
    public void sendTelemetry(String routeName, String telemetry) {
        System.out.println("WebSocket funcionando: Enviando telemetría para ruta: " + routeName + " - " + telemetry);
        messagingTemplate.convertAndSend("/topic/route/" + routeName + "/telemetry", telemetry);
    }
}