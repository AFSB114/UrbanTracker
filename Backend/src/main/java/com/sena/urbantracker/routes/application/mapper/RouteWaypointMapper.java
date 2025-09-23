package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;

public class RouteWaypointMapper {

    public static RouteWaypointDto toDto(RouteWaypointDomain entity) {
        if (entity == null) return null;
        RouteWaypointDto dto = new RouteWaypointDto();
        dto.setId(entity.getId());
        dto.setRouteId(entity.getRouteId());
        dto.setSequence(entity.getSequence());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setType(entity.getType());
        return dto;
    }

    public static RouteWaypointDomain toEntity(RouteWaypointDto dto, RouteDomain route) {
        RouteWaypointDomain entity = new RouteWaypointDomain();
        entity.setRoute(route);
        entity.setSequence(dto.getSequence());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setType(dto.getType());
        return entity;
    }
}