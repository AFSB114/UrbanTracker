package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteTrajectoryReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteTrajectoryResDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteTrajectoryDomain;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;

public class RouteTrajectoryMapper {

    public static RouteTrajectoryResDto toDto(RouteTrajectoryDomain entity) {
        if (entity == null) return null;
        return RouteTrajectoryResDto.builder()
                .id(entity.getId())
                .routeId(entity.getRoute() != null ? entity.getRoute().getId() : null)
                .vehicleId(entity.getVehicle() != null ? entity.getVehicle().getId() : null)
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .trajectoryStatus(entity.getTrajectoryStatus())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static RouteTrajectoryDomain toEntity(RouteTrajectoryReqDto dto) {
        if (dto == null) return null;
        return RouteTrajectoryDomain.builder()
                .route(RouteDomain.builder().id(dto.getRouteId()).build())
                .vehicle(VehicleDomain.builder().id(dto.getVehicleId()).build()) // Assuming Vehicle has id
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .trajectoryStatus(dto.getTrajectoryStatus())
                .active(true)
                .build();
    }
}