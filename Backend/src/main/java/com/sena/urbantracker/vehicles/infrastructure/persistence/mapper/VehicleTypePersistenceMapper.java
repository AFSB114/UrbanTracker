package com.sena.urbantracker.vehicles.infrastructure.persistence.mapper;

import com.sena.urbantracker.vehicles.domain.entity.VehicleTypeDomain;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleTypeModel;

public class VehicleTypePersistenceMapper {

    public static VehicleTypeModel toModel(VehicleTypeDomain domain) {
        if (domain == null) return null;
        return VehicleTypeModel.builder()
                .id(domain.getId())
                .name(domain.getName())
                .description(domain.getDescription())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static VehicleTypeDomain toDomain(VehicleTypeModel model) {
        if (model == null) return null;
        return VehicleTypeDomain.builder()
                .id(model.getId())
                .name(model.getName())
                .description(model.getDescription())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}