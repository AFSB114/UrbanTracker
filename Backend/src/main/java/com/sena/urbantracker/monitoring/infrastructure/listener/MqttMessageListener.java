package com.sena.urbantracker.monitoring.infrastructure.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.monitoring.application.dto.request.TrackingReqDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MqttMessageListener {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleIncomingMessage(Message<?> message) throws JsonProcessingException {
        String topic = (String) message.getHeaders().get("mqtt_receivedTopic");
        String payload = message.getPayload().toString();

        log.info("📩 MQTT recibido | Topic: {} | Payload: {}", topic, payload);

        if (topic.startsWith("routes/")) {
            String[] parts = topic.split("/");
            String routeId = parts[1];

            try {
                TrackingReqDto telemetry = objectMapper.readValue(payload, TrackingReqDto.class);
                messagingTemplate.convertAndSend("/topic/route/" + routeId + "/telemetry", telemetry);
                log.info("📡 Telemetría enviada vía WebSocket para routeId: {}", routeId);
            } catch (Exception e) {
                log.error("Error parseando payload MQTT para routeId: {}", routeId, e);
            }
        }
    }
}