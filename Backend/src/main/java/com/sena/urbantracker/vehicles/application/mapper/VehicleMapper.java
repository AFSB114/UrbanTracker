package com.sena.urbantracker.vehicles.application.mapper;

import com.sena.urbantracker.vehicles.application.dto.request.VehicleReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleResDto;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import com.sena.urbantracker.vehicles.domain.valueobject.VehicleStatusType;

public class VehicleMapper {

    public static VehicleResDto toDto(VehicleDomain entity) {
        if (entity == null) return null;
        VehicleResDto dto = new VehicleResDto();
        dto.setId(entity.getId());
        dto.setLicencePlate(entity.getLicencePlate());
        dto.setBrand(entity.getBrand());
        dto.setModel(entity.getModel());
        dto.setYear(entity.getYear());
        dto.setColor(entity.getColor());
        dto.setPassengerCapacity(entity.getPassengerCapacity());
        dto.setStatus(entity.getStatus().name());
        // company and vehicleType need to be fetched separately or set to null
        dto.setCompany(null);
        dto.setVehicleType(null);
        return dto;
    }

    public static VehicleDomain toEntity(VehicleReqDto dto) {
        if (dto == null) return null;
        return VehicleDomain.builder()
                .company(null)
                .vehicleType(null)
                .licencePlate(dto.getLicencePlate())
                .brand(dto.getBrand())
                .model(dto.getModel())
                .year(dto.getYear())
                .color(dto.getColor())
                .passengerCapacity(dto.getPassengerCapacity())
                .status(dto.getStatus() != null ? dto.getStatus() : VehicleStatusType.ACTIVE)
                .inService(dto.isInService())
                .active(true)
                .build();
    }
}