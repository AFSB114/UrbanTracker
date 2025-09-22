package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;

public class RouteMapper {

    public static RouteReqDto toDto(RouteDomain entity) {
        if (entity == null) return null;
        RouteReqDto dto = new RouteReqDto();
        dto.setId(entity.getId());
        dto.setNumberRoute(entity.getNumberRoute().toString());
        dto.setDescription(entity.getDescription());
        dto.setTotalDistance(entity.getTotalDistance());
        return dto;
    }

    public static RouteDomain toEntity(RouteReqDto dto) {
        RouteDomain entity = new RouteDomain();
        entity.setNumberRoute(Integer.valueOf(dto.getNumberRoute()));
        entity.setDescription(dto.getDescription());
        entity.setTotalDistance(dto.getTotalDistance());
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