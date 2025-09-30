package com.sena.urbantracker.mqtt.infrastructure.controller;

import com.sena.urbantracker.mqtt.application.service.DynamicSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mqtt/dynamic")
@RequiredArgsConstructor
public class MqttDynamicController {

    private final DynamicSubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public String subscribe(@RequestParam String topic,
                            @RequestParam(defaultValue = "1") int qos) {
        subscriptionService.subscribeToRouteTopic(topic);
        return "✅ Suscrito dinámicamente a: " + topic;
    }

    @PostMapping("/unsubscribe")
    public String unsubscribe(@RequestParam String topic) {
        subscriptionService.unsubscribeFromRouteTopic(topic);
        return "❌ Suscripción cancelada: " + topic;
    }
}
