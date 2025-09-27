package com.sena.urbantracker.mqtt.infrastructure.listener;


import lombok.extern.slf4j.Slf4j;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MqttMessageListener {

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleIncomingMessage(Message<?> message) {
        String topic = (String) message.getHeaders().get("mqtt_receivedTopic");
        String payload = message.getPayload().toString();

        log.info("MQTT recibido | Topic: {} | Payload: {}", topic, payload);

        // demás logica de alguna service de tracking
    }
}
