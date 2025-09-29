package com.sena.urbantracker.monitoring.infrastructure.persistence.mapper;

import com.sena.urbantracker.monitoring.domain.entity.TrackingDomain;
import com.sena.urbantracker.monitoring.infrastructure.persistence.model.TrackingModel;

public class TrackingPersistenceMapper {

    public static TrackingModel toModel(TrackingDomain domain) {
        if (domain == null) return null;
        return TrackingModel.builder()
                .id(domain.getId())
                .vehicleId(domain.getVehicleId()) // Assuming vehicle is stored as ID
                .timestamp(domain.getTimestamp())
                .latitude(domain.getLatitude())
                .longitude(domain.getLongitude())
                .dataSource(domain.getDataSource())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static TrackingDomain toDomain(TrackingModel model) {
        if (model == null) return null;
        return TrackingDomain.builder()
                .id(model.getId())
                .vehicleId(model.getVehicle() != null ? model.getVehicle().getId() : null)
                .timestamp(model.getTimestamp())
                .latitude(model.getLatitude())
                .longitude(model.getLongitude())
                .dataSource(model.getDataSource())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}