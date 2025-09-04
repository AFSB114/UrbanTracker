package com.sena.urbantracker.routes.factory;

import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.model.entity.RouteWaypoint;
import org.springframework.stereotype.Component;

/**
 * Default implementation of RouteWaypointFactory using Lombok builder.
 */
@Component
public class DefaultRouteWaypointFactory implements RouteWaypointFactory {
    @Override
    public RouteWaypoint create(Route route, Integer sequence, Double latitude, Double longitude) {
        return RouteWaypoint.builder()
                .route(route)
                .sequence(sequence)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
