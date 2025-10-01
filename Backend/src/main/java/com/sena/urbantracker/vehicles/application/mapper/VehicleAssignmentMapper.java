package com.sena.urbantracker.vehicles.application.mapper;

import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleAssignmentReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDto;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;

public class VehicleAssignmentMapper {

    public static VehicleAssigmentResDto toDto(VehicleAssignmentDomain entity) {
        if (entity == null) return null;
        return VehicleAssigmentResDto.builder()
                .id(entity.getId())
                .vehicleId(entity.getVehicle().getId())
                .vehiclePlate(entity.getVehicle().getLicencePlate())
                .vehicleName(entity.getVehicle().getBrand() + " " + entity.getVehicle().getModel())
                .driverId(entity.getDriver().getId())
                .driverName(entity.getDriver().getProfile() != null ? entity.getDriver().getProfile().getFirstName() + " " + entity.getDriver().getProfile().getLastName() : "")
                .assignmentStatus(entity.getAssignmentStatus())
                .note(entity.getNote())
                .build();
    }

    public static VehicleAssignmentDomain toEntity(VehicleAssignmentReqDto dto) {
        if (dto == null) return null;
        return VehicleAssignmentDomain.builder()
                .vehicle(VehicleDomain.builder().id(dto.getVehicleId()).build())
                .driver(DriverDomain.builder().id(dto.getDriverId()).build())
                .assignmentStatus(dto.getAssignmentStatus())
                .note(dto.getNote())
                .active(true)
                .build();
    }
}