package com.sena.urbantracker.vehicles.application.mapper;

import com.sena.urbantracker.vehicles.application.dto.request.VehicleTypeReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleTypeResDto;
import com.sena.urbantracker.vehicles.domain.entity.VehicleTypeDomain;

public class VehicleTypeMapper {

    public static VehicleTypeResDto toDto(VehicleTypeDomain entity) {
        if (entity == null) return null;
        return VehicleTypeResDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }

    public static VehicleTypeDomain toEntity(VehicleTypeReqDto dto) {
        if (dto == null) return null;
        return VehicleTypeDomain.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .active(true)
                .build();
    }
}