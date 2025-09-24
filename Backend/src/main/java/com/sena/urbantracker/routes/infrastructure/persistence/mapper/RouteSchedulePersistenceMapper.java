package com.sena.urbantracker.routes.infrastructure.persistence.mapper;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteScheduleModel;

public class RouteSchedulePersistenceMapper {

    public static RouteScheduleModel toModel(RouteScheduleDomain domain) {
        if (domain == null) return null;
        return RouteScheduleModel.builder()
                .id(domain.getId())
                .route(RoutePersistenceMapper.toModel(domain.getRoute()))
                .dayOfWeek(domain.getDayOfWeek())
                .startTime(domain.getStartTime())
                .endTime(domain.getEndTime())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static RouteScheduleDomain toDomain(RouteScheduleModel model) {
        if (model == null) return null;
        return RouteScheduleDomain.builder()
                .id(model.getId())
                .route(RoutePersistenceMapper.toDomain(model.getRoute()))
                .dayOfWeek(model.getDayOfWeek())
                .startTime(model.getStartTime())
                .endTime(model.getEndTime())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}