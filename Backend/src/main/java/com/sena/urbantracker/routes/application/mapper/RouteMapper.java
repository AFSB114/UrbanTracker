package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDetailsResDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;

public class RouteMapper {

    public static RouteResDto toDto(RouteDomain entity, Integer numWaypoints ) {
        if (entity == null) return null;
        return RouteResDto.builder()
                .id(entity.getId())
                .numberRoute(entity.getNumberRoute().toString())
                .description(entity.getDescription())
                .totalDistance(entity.getTotalDistance())
                .waypoints(numWaypoints)
                .outboundImageUrl(entity.getOutboundImageUrl())
                .returnImageUrl(entity.getReturnImageUrl())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static RouteDetailsResDto toDtoDetail(RouteDomain entity ) {
        if (entity == null) return null;
        return RouteDetailsResDto.builder()
                .id(entity.getId())
                .numberRoute(entity.getNumberRoute().toString())
                .description(entity.getDescription())
                .totalDistance(entity.getTotalDistance())
                .outboundImageUrl(entity.getOutboundImageUrl())
                .returnImageUrl(entity.getReturnImageUrl())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static RouteDomain toEntity(RouteReqDto dto) {
        if (dto == null) return null;
        return RouteDomain.builder()
                .numberRoute(Integer.valueOf(dto.getNumberRoute()))
                .description(dto.getDescription())
                .totalDistance(Double.valueOf(dto.getTotalDistance()))
                .outboundImageUrl(dto.getOutboundImageUrl())
                .returnImageUrl(dto.getReturnImageUrl())
                .active(true)
                .build();
    }
}