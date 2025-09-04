package com.sena.urbantracker.messaging.mqtt;

/**
 * Functional interface for handling raw MQTT messages.
 */
@FunctionalInterface
public interface MqttMessageHandler {
    /**
     * Handle a message delivered on topic with raw payload bytes.
     */
    void handle(String topic, byte[] payload);
}
