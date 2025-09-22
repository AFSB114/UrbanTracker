package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;

public class RouteMapper {

    public static RouteDto toDto(RouteDomain entity) {
        if (entity == null) return null;
        RouteDto dto = new RouteDto();
        dto.setId(entity.getId());
        dto.setNumberRoute(entity.getNumberRoute().toString());
        dto.setDescription(entity.getDescription());
        dto.setTotalDistance(entity.getTotalDistance());
        dto.setActive(entity.getActive());
        return dto;
    }

    public static RouteDomain toEntity(RouteDto dto) {
        RouteDomain entity = new RouteDomain();
        entity.setId(dto.getId());
        entity.setNumberRoute(Integer.valueOf(dto.getNumberRoute()));
        entity.setDescription(dto.getDescription());
        entity.setTotalDistance(dto.getTotalDistance());
        entity.setActive(dto.getActive());
        return entity;
    }

    public static RouteDomain toEntity(RouteWithWaypointsReqDto dto) {
        return RouteDomain.builder()
                .numberRoute(Integer.valueOf(dto.getNumberRoute()))
                .description(dto.getDescription())
                .totalDistance(dto.getTotalDistance())
                .build();
    }
}