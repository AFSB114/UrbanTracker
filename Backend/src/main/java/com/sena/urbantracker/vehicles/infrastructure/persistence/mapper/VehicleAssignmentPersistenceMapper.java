package com.sena.urbantracker.vehicles.infrastructure.persistence.mapper;

import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleAssignmentModel;

public class VehicleAssignmentPersistenceMapper {

    public static VehicleAssignmentModel toModel(VehicleAssignmentDomain domain) {
        if (domain == null) return null;
        return VehicleAssignmentModel.builder()
                .id(domain.getId())
                .vehicle(null) // TODO: map vehicle if needed
                .driver(null) // TODO: map driver if needed
                .assignmentStatus(domain.getAssignmentStatus())
                .note(domain.getNote())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static VehicleAssignmentDomain toDomain(VehicleAssignmentModel model) {
        if (model == null) return null;
        return VehicleAssignmentDomain.builder()
                .id(model.getId())
                .vehicleId(model.getVehicle() != null ? model.getVehicle().getId() : null)
                .driverId(model.getDriver() != null ? model.getDriver().getId() : null)
                .assignmentStatus(model.getAssignmentStatus())
                .note(model.getNote())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}