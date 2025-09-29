package com.sena.urbantracker.routes.application.mapper;

import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;

public class RouteScheduleMapper {

    public static RouteScheduleResDto toDto(RouteScheduleDomain entity) {
        if (entity == null) return null;
        return RouteScheduleResDto.builder()
                .id(entity.getId())
                .routeId(entity.getRoute() != null ? entity.getRoute().getId() : null)
                .dayOfWeek(entity.getDayOfWeek())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static RouteScheduleDomain toEntity(RouteScheduleReqDto dto) {
        if (dto == null) return null;
        return RouteScheduleDomain.builder()
                .route(RouteDomain.builder().id(dto.getRouteId()).build()) // Assuming RouteDomain has id
                .dayOfWeek(dto.getDayOfWeek())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .active(true)
                .build();
    }
}