package com.sena.urbantracker.mqtt.application.service;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.RouteRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MqttInitializationService {

    private final RouteRepository routeRepository;
    private final DynamicSubscriptionService dynamicSubscriptionService;

    @PostConstruct
    public void initializeSubscriptions() {
        log.info("🚀 Inicializando suscripciones MQTT para rutas activas...");

        List<RouteDomain> activeRoutes = routeRepository.findAll().stream()
                .filter(route -> Boolean.TRUE.equals(route.getActive()))
                .toList();

        for (RouteDomain route : activeRoutes) {
            String routeTopic = "routes/" + route.getId() + "/telemetry";
            try {
                dynamicSubscriptionService.subscribeToRouteTopic(routeTopic);
                log.info("✅ Suscrito al topic: {}", routeTopic);
            } catch (Exception e) {
                log.error("❌ Error al suscribirse al topic {}: {}", routeTopic, e.getMessage());
            }
        }

        log.info("🎉 Inicialización de suscripciones MQTT completada. Total rutas activas: {}", activeRoutes.size());
    }
}