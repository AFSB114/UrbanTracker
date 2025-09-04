package com.sena.urbantracker.messaging.mqtt;

/**
 * Abstraction for subscribing to MQTT messages.
 *
 * SRP: Only responsible for subscriptions management.
 */
public interface MqttSubscriber {

    /**
     * Subscribe to a topic with a raw bytes handler.
     * @param topicFilter topic or filter (supports wildcards)
     * @param qos QoS level (0..2)
     * @param handler callback invoked for each message
     */
    void subscribe(String topicFilter, int qos, MqttMessageHandler handler);

    /**
     * Convenience with QoS 1.
     */
    default void subscribe(String topicFilter, MqttMessageHandler handler) {
        subscribe(topicFilter, 1, handler);
    }

    /**
     * Subscribe decoding messages to a specific class using the configured PayloadConverter.
     */
    <T> void subscribe(String topicFilter, int qos, Class<T> clazz, TypedMessageHandler<T> handler);

    /**
     * Convenience decoded subscribe with QoS 1.
     */
    default <T> void subscribe(String topicFilter, Class<T> clazz, TypedMessageHandler<T> handler) {
        subscribe(topicFilter, 1, clazz, handler);
    }

    /**
     * Unsubscribe from a topicFilter.
     */
    void unsubscribe(String topicFilter);

    @FunctionalInterface
    interface TypedMessageHandler<T> {
        void handle(String topic, T message);
    }
}
