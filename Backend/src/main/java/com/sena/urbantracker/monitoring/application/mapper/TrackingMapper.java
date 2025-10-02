package com.sena.urbantracker.monitoring.application.mapper;

import com.sena.urbantracker.monitoring.application.dto.request.TrackingReqDto;
import com.sena.urbantracker.monitoring.application.dto.response.TrackingResDto;
import com.sena.urbantracker.monitoring.domain.entity.TrackingDomain;
import lombok.Builder;

public class TrackingMapper {

    public static TrackingResDto toDto(TrackingDomain entity) {
        if (entity == null) return null;
        return TrackingResDto.builder()
                .id(entity.getId())
                .routeId(entity.getRouteId().toString())
                .vehicleId(entity.getVehicleId().toString())
                .timestamp(entity.getTimestamp())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .build();
    }

    public static TrackingDomain toEntity(TrackingReqDto dto) {
        if (dto == null) return null;
        return TrackingDomain.builder()
                // Map fields here
                .build();
    }
}