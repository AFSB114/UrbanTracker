package com.sena.urbantracker.routes.factory;

import com.sena.urbantracker.routes.model.entity.Route;
import org.springframework.stereotype.Component;

/**
 * Default implementation of RouteFactory using Lombok builder.
 */
@Component
public class DefaultRouteFactory implements RouteFactory {
    @Override
    public Route create(Integer numberRoute, String description, Double totalDistance, Boolean active) {
        return Route.builder()
                .numberRoute(numberRoute)
                .description(description)
                .totalDistance(totalDistance != null ? totalDistance : 0.0)
                .active(active != null ? active : Boolean.TRUE)
                .build();
    }
}
