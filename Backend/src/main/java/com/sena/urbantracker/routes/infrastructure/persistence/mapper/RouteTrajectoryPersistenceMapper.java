package com.sena.urbantracker.routes.infrastructure.persistence.mapper;

import com.sena.urbantracker.routes.domain.entity.RouteTrajectoryDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteTrajectoryModel;
import com.sena.urbantracker.vehicles.infrastructure.persistence.mapper.VehiclePersistenceMapper;

public class RouteTrajectoryPersistenceMapper {

    public static RouteTrajectoryModel toModel(RouteTrajectoryDomain domain) {
        if (domain == null) return null;
        return RouteTrajectoryModel.builder()
                .id(domain.getId())
                .route(RoutePersistenceMapper.toModel(domain.getRoute()))
                .vehicle(VehiclePersistenceMapper.toModel(domain.getVehicle()))
                .startTime(domain.getStartTime())
                .endTime(domain.getEndTime())
                .trajectoryStatus(domain.getTrajectoryStatus())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static RouteTrajectoryDomain toDomain(RouteTrajectoryModel model) {
        if (model == null) return null;
        return RouteTrajectoryDomain.builder()
                .id(model.getId())
                .route(RoutePersistenceMapper.toDomain(model.getRoute()))
                .vehicle(VehiclePersistenceMapper.toDomain(model.getVehicle()))
                .startTime(model.getStartTime())
                .endTime(model.getEndTime())
                .trajectoryStatus(model.getTrajectoryStatus())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}