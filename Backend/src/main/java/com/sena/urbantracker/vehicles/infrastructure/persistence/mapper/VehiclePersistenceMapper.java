package com.sena.urbantracker.vehicles.infrastructure.persistence.mapper;

import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;

public class VehiclePersistenceMapper {

    public static VehicleModel toModel(VehicleDomain domain) {
        if (domain == null) return null;
        return VehicleModel.builder()
                .id(domain.getId())
                .company(null) // TODO: map company if needed
                .vehicleType(null) // TODO: map vehicleType if needed
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
                .companyId(model.getCompany() != null ? model.getCompany().getId() : null)
                .vehicleTypeId(model.getVehicleType() != null ? model.getVehicleType().getId() : null)
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