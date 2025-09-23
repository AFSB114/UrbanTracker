package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;

public class RouteMapper {

    public static RouteResDto toDto(RouteDomain entity) {
        if (entity == null) return null;
        return RouteResDto.builder()
                .id(entity.getId())
                .numberRoute(entity.getNumberRoute().toString())
                .description(entity.getDescription())
                .totalDistance(entity.getTotalDistance())
                .build();
    }

    public static RouteDomain toEntity(RouteReqDto dto) {
        if (dto == null) return null;
        return RouteDomain.builder()
                .numberRoute(Integer.valueOf(dto.getNumberRoute()))
                .description(dto.getDescription())
                .totalDistance(dto.getTotalDistance())
                .active(true)
                .build();
    }

    public static RouteDomain toEntity(RouteWithWaypointsReqDto dto) {
        if (dto == null) return null;
        return RouteDomain.builder()
                .numberRoute(Integer.valueOf(dto.getNumberRoute()))
                .description(dto.getDescription())
                .totalDistance(dto.getTotalDistance())
                .active(true)
                .build();
    }
}