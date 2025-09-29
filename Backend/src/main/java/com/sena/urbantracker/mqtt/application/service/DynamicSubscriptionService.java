package com.sena.urbantracker.mqtt.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DynamicSubscriptionService {

    private final MqttPahoMessageDrivenChannelAdapter inboundAdapter;

    public void subscribeToRouteTopic(String routeTopic) {
        if (inboundAdapter == null) {
            throw new IllegalStateException("El inboundAdapter MQTT no está inicializado");
        }
        log.info("🔔 Suscribiéndose dinámicamente al topic de ruta: {}", routeTopic);
        inboundAdapter.addTopic(routeTopic, 1); // QoS 1 por defecto
    }

    public void unsubscribeFromRouteTopic(String routeTopic) {
        log.info("🔕 Cancelando suscripción al topic de ruta: {}", routeTopic);
        inboundAdapter.removeTopic(routeTopic);
    }
}
