package com.sena.urbantracker.monitoring.infrastructure.controller.mqtt;

import com.sena.urbantracker.monitoring.application.service.mqtt.MqttPublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mqtt")
public class MqttController {

    private final MqttPublisherService publisherService;

    @PostMapping("/publish")
    public String publish(@RequestParam String msg) {
        publisherService.publish(msg);
        return "Mensaje MQTT enviado correctamente.";
    }
}