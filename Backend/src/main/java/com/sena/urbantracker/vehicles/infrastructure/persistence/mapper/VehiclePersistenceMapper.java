package com.sena.urbantracker.vehicles.infrastructure.persistence.mapper;

import com.sena.urbantracker.users.infrastructure.persistence.mapper.CompanyPersistenceMapper;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import com.sena.urbantracker.vehicles.infrastructure.persistence.mapper.VehicleTypePersistenceMapper;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;

public class VehiclePersistenceMapper {

    public static VehicleModel toModel(VehicleDomain domain) {
        if (domain == null) return null;
        return VehicleModel.builder()
                .id(domain.getId())
                .company(CompanyPersistenceMapper.toModel(domain.getCompany()))
                .vehicleType(VehicleTypePersistenceMapper.toModel(domain.getVehicleType()))
                .licencePlate(domain.getLicencePlate())
                .brand(domain.getBrand())
                .model(domain.getModel())
                .year(domain.getYear())
                .color(domain.getColor())
                .passengerCapacity(domain.getPassengerCapacity())
                .status(domain.getStatus())
                .inService(domain.isInService())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static VehicleDomain toDomain(VehicleModel model) {
        if (model == null) return null;
        return VehicleDomain.builder()
                .id(model.getId())
                .company(CompanyPersistenceMapper.toDomain(model.getCompany()))
                .vehicleType(VehicleTypePersistenceMapper.toDomain(model.getVehicleType()))
                .licencePlate(model.getLicencePlate())
                .brand(model.getBrand())
                .model(model.getModel())
                .year(model.getYear())
                .color(model.getColor())
                .passengerCapacity(model.getPassengerCapacity())
                .status(model.getStatus())
                .inService(model.isInService())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}