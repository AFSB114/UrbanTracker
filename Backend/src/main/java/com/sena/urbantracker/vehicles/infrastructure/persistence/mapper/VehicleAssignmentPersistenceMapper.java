package com.sena.urbantracker.vehicles.infrastructure.persistence.mapper;

import com.sena.urbantracker.users.infrastructure.persistence.mapper.DriverPersistenceMapper;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleAssignmentModel;

public class VehicleAssignmentPersistenceMapper {

    public static VehicleAssignmentModel toModel(VehicleAssignmentDomain domain) {
        if (domain == null) return null;
        return VehicleAssignmentModel.builder()
                .id(domain.getId())
                .vehicle(VehiclePersistenceMapper.toModel(domain.getVehicle()))
                .driver(DriverPersistenceMapper.toModel(domain.getDriver()))
                .assignmentStatus(domain.getAssignmentStatus())
                .note(domain.getNote())
                .active(domain.getActive())
                .build();
    }

    public static VehicleAssignmentDomain toDomain(VehicleAssignmentModel model) {
        if (model == null) return null;
        return VehicleAssignmentDomain.builder()
                .id(model.getId())
                .vehicle(VehiclePersistenceMapper.toDomain(model.getVehicle()))
                .driver(DriverPersistenceMapper.toDomain(model.getDriver()))
                .assignmentStatus(model.getAssignmentStatus())
                .note(model.getNote())
                .active(model.getActive())
                .build();
    }
}