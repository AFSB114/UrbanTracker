package com.sena.urbantracker.vehicles.application.mapper;

import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleAssignmentReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleResDto;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;

public class VehicleAssignmentMapper {

    public static VehicleAssigmentResDto toDto(VehicleAssignmentDomain entity) {
        if (entity == null) return null;
        return VehicleAssigmentResDto.builder()
                .id(entity.getId())
                .vehicle(VehicleResDto.builder().id(entity.getVehicleId()).build())
                .driver(DriverResDto.builder().id(entity.getDriverId()).build())
                .assignmentStatus(entity.getAssignmentStatus())
                .note(entity.getNote())
                .build();
    }

    public static VehicleAssignmentDomain toEntity(VehicleAssignmentReqDto dto) {
        if (dto == null) return null;
        return VehicleAssignmentDomain.builder()
                .vehicleId(dto.getVehicleId())
                .driverId(dto.getDriverId())
                .assignmentStatus(dto.getAssignmentStatus())
                .note(dto.getNote())
                .active(true)
                .build();
    }
}