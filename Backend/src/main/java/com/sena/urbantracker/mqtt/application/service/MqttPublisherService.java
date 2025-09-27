package com.sena.urbantracker.mqtt.application.service;

import com.sena.urbantracker.config.mqtt.MqttConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MqttPublisherService {

    private final MqttConfig.MqttGateway mqttGateway;

    public void publish(String message) {
        log.info("Publicando MQTT: {}", message);
        mqttGateway.sendToMqtt(message);
    }
}
