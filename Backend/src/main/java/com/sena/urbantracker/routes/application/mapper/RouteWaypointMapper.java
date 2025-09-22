package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.response.RouteWaypointDto;
import com.sena.urbantracker.routes.domain.entity.Route;
import com.sena.urbantracker.routes.domain.entity.RouteWaypoint;

public class RouteWaypointMapper {

    public static RouteWaypointDto toDto(RouteWaypoint entity) {
        if (entity == null) return null;
        RouteWaypointDto dto = new RouteWaypointDto();
        dto.setId(entity.getId());
        dto.setRouteId(entity.getRoute().getId());
        dto.setSequence(entity.getSequence());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setType(entity.getType());
        return dto;
    }

    public static RouteWaypoint toEntity(RouteWaypointDto dto, Route route) {
        RouteWaypoint entity = new RouteWaypoint();
        entity.setRoute(route);
        entity.setSequence(dto.getSequence());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setType(dto.getType());
        return entity;
    }
}