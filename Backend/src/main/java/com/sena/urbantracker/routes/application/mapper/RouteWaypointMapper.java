package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteWaypointResDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;

public class RouteWaypointMapper {

    public static RouteWaypointResDto toDto(RouteWaypointDomain entity) {
        if (entity == null) return null;
        return RouteWaypointResDto.builder()
                .id(entity.getId())
                .sequence(entity.getSequence())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .type(entity.getType())
                .destine(entity.getDestine())
                .build();
    }

    public static RouteWaypointDomain toEntity(RouteWaypointReqDto dto, Long id) {
        if (dto == null) return null;
        return RouteWaypointDomain.builder()
                .route(RouteDomain.builder().id(id).build())
                .sequence(dto.getSequence())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .type(dto.getType())
                .destine(dto.getDestine())
                .active(true)
                .build();
    }
}