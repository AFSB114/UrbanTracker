package com.sena.urbantracker.messaging.mqtt.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JacksonPayloadConverter implements PayloadConverter {

    private final ObjectMapper objectMapper;

    @Override
    public byte[] toBytes(Object value) {
        if (value == null) {
            throw new IllegalArgumentException("Message value cannot be null");
        }
        if (value instanceof byte[] bytes) {
            return bytes;
        }
        try {
            return objectMapper.writeValueAsBytes(value);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize message to JSON", e);
        }
    }

    @Override
    public <T> T fromBytes(byte[] bytes, Class<T> type) {
        if (bytes == null) {
            throw new IllegalArgumentException("Payload bytes cannot be null");
        }
        if (type == byte[].class) {
            @SuppressWarnings("unchecked")
            T cast = (T) bytes;
            return cast;
        }
        try {
            return objectMapper.readValue(bytes, type);
        } catch (Exception e) {
            throw new RuntimeException("Failed to deserialize JSON to " + type.getSimpleName(), e);
        }
    }
}
