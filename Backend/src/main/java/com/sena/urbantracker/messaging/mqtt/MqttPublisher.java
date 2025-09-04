package com.sena.urbantracker.messaging.mqtt;

/**
 * Abstraction for publishing MQTT messages.
 *
 * SRP: Only responsible for publishing.
 * DIP: Depends on abstractions, implemented by Paho-based adapter.
 */
public interface MqttPublisher {

    /**
     * Publish raw bytes payload to a topic.
     * @param topic MQTT topic (must not be null/blank)
     * @param payload message bytes (must not be null)
     * @param qos 0, 1 or 2
     * @param retained retained flag
     */
    void publish(String topic, byte[] payload, int qos, boolean retained);

    /**
     * Convenience method with QoS 1 and retained=false
     */
    default void publish(String topic, byte[] payload) {
        publish(topic, payload, 1, false);
    }

    /**
     * Publish a POJO using the configured PayloadConverter.
     */
    <T> void publish(String topic, T message, int qos, boolean retained);

    /**
     * Convenience publish with defaults for POJO.
     */
    default <T> void publish(String topic, T message) {
        publish(topic, message, 1, false);
    }
}
