package com.sena.urbantracker.messaging.mqtt.impl;

import com.sena.urbantracker.messaging.mqtt.MqttPublisher;
import com.sena.urbantracker.messaging.mqtt.converter.PayloadConverter;
import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PahoMqttPublisher implements MqttPublisher {

    private final IMqttClient client;
    private final MqttConnectOptions options;
    private final PayloadConverter payloadConverter;

    @Override
    public void publish(String topic, byte[] payload, int qos, boolean retained) {
        validateTopic(topic);
        if (payload == null) throw new IllegalArgumentException("payload cannot be null");
        ensureConnected();
        MqttMessage message = new MqttMessage(payload);
        message.setQos(qos);
        message.setRetained(retained);
        try {
            client.publish(topic, message);
        } catch (MqttException e) {
            throw new RuntimeException("Failed to publish MQTT message to topic " + topic, e);
        }
    }

    @Override
    public <T> void publish(String topic, T message, int qos, boolean retained) {
        byte[] bytes = payloadConverter.toBytes(message);
        publish(topic, bytes, qos, retained);
    }

    private void ensureConnected() {
        try {
            if (!client.isConnected()) {
                client.connect(options);
            }
        } catch (MqttException e) {
            throw new RuntimeException("Failed to connect MQTT client", e);
        }
    }

    private void validateTopic(String topic) {
        if (topic == null || topic.isBlank()) {
            throw new IllegalArgumentException("topic must not be null or blank");
        }
    }
}
