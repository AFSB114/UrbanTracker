package com.sena.urbantracker.routes.infrastructure.persistence.mapper;

import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteWaypointModel;

public class RouteWaypointPersistenceMapper {

    public static RouteWaypointModel toModel(RouteWaypointDomain domain) {
        if (domain == null) return null;
        return RouteWaypointModel.builder()
                .id(domain.getId())
                .route(RoutePersistenceMapper.toModel(domain.getRoute()))
                .sequence(domain.getSequence())
                .latitude(domain.getLatitude())
                .longitude(domain.getLongitude())
                .type(domain.getType())
                .destine(domain.getDestine()) // Default or handle appropriately
                .build();
    }

    public static RouteWaypointDomain toDomain(RouteWaypointModel model) {
        if (model == null) return null;
        return RouteWaypointDomain.builder()
                .id(model.getId())
                .route(RoutePersistenceMapper.toDomain(model.getRoute()))
                .sequence(model.getSequence())
                .latitude(model.getLatitude())
                .longitude(model.getLongitude())
                .type(model.getType())
                .destine(model.getDestine())
                .active(true) // Assuming active, or map from model if available
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .route(model.getRoute() != null ? RoutePersistenceMapper.toDomain(model.getRoute()) : null)
                .build();
    }
}