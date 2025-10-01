package com.sena.urbantracker.routes.infrastructure.persistence.mapper;

import com.sena.urbantracker.routes.domain.entity.RouteAssignmentDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteAssignmentModel;
import com.sena.urbantracker.vehicles.infrastructure.persistence.mapper.VehiclePersistenceMapper;

public class RouteAssignmentPersistenceMapper {

    public static RouteAssignmentModel toModel(RouteAssignmentDomain domain) {
        if (domain == null) return null;
        return RouteAssignmentModel.builder()
                .id(domain.getId())
                .route(RoutePersistenceMapper.toModel(domain.getRoute()))
                .vehicle(VehiclePersistenceMapper.toModel(domain.getVehicle()))
                .assignmentStatus(domain.getAssignmentStatus())
                .note(domain.getNote())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static RouteAssignmentDomain toDomain(RouteAssignmentModel model) {
        if (model == null) return null;
        return RouteAssignmentDomain.builder()
                .id(model.getId())
                .route(RoutePersistenceMapper.toDomain(model.getRoute()))
                .vehicle(VehiclePersistenceMapper.toDomain(model.getVehicle()))
                .assignmentStatus(model.getAssignmentStatus())
                .note(model.getNote())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}