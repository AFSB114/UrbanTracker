package com.sena.urbantracker.messaging.mqtt.impl;

import com.sena.urbantracker.messaging.mqtt.MqttMessageHandler;
import com.sena.urbantracker.messaging.mqtt.MqttSubscriber;
import com.sena.urbantracker.messaging.mqtt.converter.PayloadConverter;
import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class PahoMqttSubscriber implements MqttSubscriber {

    private final IMqttClient client;
    private final MqttConnectOptions options;
    private final PayloadConverter payloadConverter;
    private final Map<String, IMqttMessageListener> listeners = new ConcurrentHashMap<>();

    @Override
    public void subscribe(String topicFilter, int qos, MqttMessageHandler handler) {
        ensureConnected();
        IMqttMessageListener listener = (topic, mqttMessage) -> safeHandle(handler, topic, mqttMessage);
        try {
            client.subscribe(topicFilter, qos, listener);
            listeners.put(topicFilter, listener);
        } catch (MqttException e) {
            throw new RuntimeException("Failed to subscribe to topic filter " + topicFilter, e);
        }
    }

    @Override
    public <T> void subscribe(String topicFilter, int qos, Class<T> clazz, TypedMessageHandler<T> handler) {
        ensureConnected();
        IMqttMessageListener listener = (topic, mqttMessage) -> safeHandleTyped(clazz, handler, topic, mqttMessage);
        try {
            client.subscribe(topicFilter, qos, listener);
            listeners.put(topicFilter, listener);
        } catch (MqttException e) {
            throw new RuntimeException("Failed to subscribe to topic filter " + topicFilter, e);
        }
    }

    @Override
    public void unsubscribe(String topicFilter) {
        IMqttMessageListener listener = listeners.remove(topicFilter);
        if (listener == null) return; // nothing to do
        try {
            client.unsubscribe(topicFilter);
        } catch (MqttException e) {
            throw new RuntimeException("Failed to unsubscribe from topic filter " + topicFilter, e);
        }
    }

    private void safeHandle(MqttMessageHandler handler, String topic, MqttMessage mqttMessage) {
        try {
            handler.handle(topic, mqttMessage.getPayload());
        } catch (Exception e) {
            // swallow to avoid breaking the MQTT callback thread; loggable if a logger is available
        }
    }

    private <T> void safeHandleTyped(Class<T> clazz, TypedMessageHandler<T> handler, String topic, MqttMessage mqttMessage) {
        try {
            T obj = payloadConverter.fromBytes(mqttMessage.getPayload(), clazz);
            handler.handle(topic, obj);
        } catch (Exception e) {
            // swallow to avoid breaking the MQTT callback thread; loggable if a logger is available
        }
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
}
