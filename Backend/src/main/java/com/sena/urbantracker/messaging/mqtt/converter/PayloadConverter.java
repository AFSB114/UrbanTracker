package com.sena.urbantracker.messaging.mqtt.converter;

/**
 * Strategy interface to convert between POJOs and MQTT byte[] payloads.
 */
public interface PayloadConverter {

    byte[] toBytes(Object value);

    <T> T fromBytes(byte[] bytes, Class<T> type);
}
