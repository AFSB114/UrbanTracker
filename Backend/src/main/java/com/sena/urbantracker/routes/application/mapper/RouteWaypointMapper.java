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

    public static RouteWaypointDomain toEntity(RouteWaypointReqDto dto, RouteDomain route) {
        RouteWaypointDomain entity = new RouteWaypointDomain();
        entity.setRoute(route);
        entity.setSequence(dto.getSequence());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setType(dto.getType());
        return RouteWaypointDomain.builder()
                .route(route)
                .sequence(dto.getSequence())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .type(dto.getType())
                .destine(dto.getDestine())
                .build();
    }
}