package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteAssignmentReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteAssignmentResDto;
import com.sena.urbantracker.routes.domain.entity.RouteAssignmentDomain;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;

public class RouteAssignmentMapper {

    public static RouteAssignmentResDto toDto(RouteAssignmentDomain entity) {
        if (entity == null) return null;
        return RouteAssignmentResDto.builder()
                .id(entity.getId())
                .routeId(entity.getRoute() != null ? entity.getRoute().getId() : null)
                .routeNumber(entity.getRoute() != null && entity.getRoute().getNumberRoute() != null ? entity.getRoute().getNumberRoute().toString() : null)
                .vehicleId(entity.getVehicle() != null ? entity.getVehicle().getId() : null)
                .vehiclePlate(entity.getVehicle() != null ? entity.getVehicle().getLicencePlate() : null)
                .assignmentStatus(entity.getAssignmentStatus())
                .note(entity.getNote())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static RouteAssignmentDomain toEntity(RouteAssignmentReqDto dto) {
        if (dto == null) return null;
        return RouteAssignmentDomain.builder()
                .route(RouteDomain.builder().id(dto.getRouteId()).build())
                .vehicle(VehicleDomain.builder().id(dto.getVehicleId()).build())
                .assignmentStatus(dto.getAssignmentStatus())
                .note(dto.getNote())
                .active(true)
                .build();
    }
}