package com.sena.urbantracker.mqtt.infrastructure.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        Object rawPayload = message.getPayload();
        String payload;

        if (rawPayload instanceof byte[]) {
            payload = new String((byte[]) rawPayload);
        } else {
            payload = rawPayload.toString();
        }

        log.info("📩 MQTT recibido | Topic: {} | Payload: {}", topic, payload);

        if (topic.startsWith("routes/")) {
            String[] parts = topic.split("/");
            String routeNumber = parts[1]; // ejemplo: routes/10/telemetry
            log.info("➡️ Mensaje pertenece a la ruta número {}", routeNumber);

            // Enviar el mensaje de telemetría al topic WebSocket correspondiente
            log.info("📤 Enviando a WebSocket /topic/route/{}/telemetry: {}", routeNumber, payload);
            JsonNode jsonNode = objectMapper.readTree(payload);
            messagingTemplate.convertAndSend("/topic/route/" + routeNumber + "/telemetry", jsonNode);
        }
    }
}
