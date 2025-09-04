package com.sena.urbantracker.monitoring.messaging;

import com.sena.urbantracker.messaging.mqtt.MqttPublisher;
import com.sena.urbantracker.messaging.mqtt.MqttSubscriber;
import com.sena.urbantracker.monitoring.model.dto.message.RealTimeLocationMessage;
import org.springframework.stereotype.Service;

/**
 * Facade service for Monitoring domain to interact with MQTT broker.
 * Provides high-level methods to publish and subscribe to real-time locations.
 */
@Service
public class MonitoringMqttService {

    private final MqttPublisher publisher;
    private final MqttSubscriber subscriber;

    public MonitoringMqttService(MqttPublisher publisher, MqttSubscriber subscriber) {
        this.publisher = publisher;
        this.subscriber = subscriber;
    }

    // Publish
    public void publishRealTimeLocation(RealTimeLocationMessage message, int qos, boolean retained) {
        if (message == null) throw new IllegalArgumentException("message cannot be null");
        if (message.getVehicleId() == null || message.getVehicleId().isBlank()) {
            throw new IllegalArgumentException("vehicleId is required in RealTimeLocationMessage");
        }
        String topic = MonitoringTopics.realTimeLocationOfVehicle(message.getVehicleId());
        publisher.publish(topic, message, qos, retained);
    }

    public void publishRealTimeLocation(RealTimeLocationMessage message) {
        publishRealTimeLocation(message, 1, false);
    }

    // Subscribe (typed)
    public void subscribeAllRealTimeLocations(int qos, MqttSubscriber.TypedMessageHandler<RealTimeLocationMessage> handler) {
        subscriber.subscribe(MonitoringTopics.ALL_REALTIME_LOCATIONS, qos, RealTimeLocationMessage.class, handler);
    }

    public void subscribeAllRealTimeLocations(MqttSubscriber.TypedMessageHandler<RealTimeLocationMessage> handler) {
        subscribeAllRealTimeLocations(1, handler);
    }

    public void subscribeVehicleRealTimeLocation(String vehicleId, int qos, MqttSubscriber.TypedMessageHandler<RealTimeLocationMessage> handler) {
        String topic = MonitoringTopics.realTimeLocationOfVehicle(vehicleId);
        subscriber.subscribe(topic, qos, RealTimeLocationMessage.class, handler);
    }

    public void subscribeVehicleRealTimeLocation(String vehicleId, MqttSubscriber.TypedMessageHandler<RealTimeLocationMessage> handler) {
        subscribeVehicleRealTimeLocation(vehicleId, 1, handler);
    }

    // Unsubscribe helpers
    public void unsubscribeAllRealTimeLocations() {
        subscriber.unsubscribe(MonitoringTopics.ALL_REALTIME_LOCATIONS);
    }

    public void unsubscribeVehicleRealTimeLocation(String vehicleId) {
        subscriber.unsubscribe(MonitoringTopics.realTimeLocationOfVehicle(vehicleId));
    }
}
