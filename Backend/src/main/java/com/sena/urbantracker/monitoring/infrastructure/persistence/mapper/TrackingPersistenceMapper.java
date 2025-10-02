package com.sena.urbantracker.monitoring.infrastructure.persistence.mapper;

import com.sena.urbantracker.monitoring.domain.entity.TrackingDomain;
import com.sena.urbantracker.monitoring.infrastructure.persistence.model.TrackingModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;

public class TrackingPersistenceMapper {

    public static TrackingModel toModel(TrackingDomain domain) {
        if (domain == null) return null;
        return TrackingModel.builder()
                .id(domain.getId())
                .route(RouteModel.builder().id(domain.getRouteId()).build())
                .vehicle(VehicleModel.builder().id(domain.getVehicleId()).build()) // Assuming vehicle is stored as ID
                .timestamp(domain.getTimestamp())
                .latitude(domain.getLatitude())
                .longitude(domain.getLongitude())
                .dataSource(domain.getDataSource())
                .build();
    }

    public static TrackingDomain toDomain(TrackingModel model) {
        if (model == null) return null;
        return TrackingDomain.builder()
                .id(model.getId())
                .routeId(model.getRoute().getId())
                .vehicleId(model.getVehicle() != null ? model.getVehicle().getId() : null)
                .timestamp(model.getTimestamp())
                .latitude(model.getLatitude())
                .longitude(model.getLongitude())
                .dataSource(model.getDataSource())
                .build();
    }
}