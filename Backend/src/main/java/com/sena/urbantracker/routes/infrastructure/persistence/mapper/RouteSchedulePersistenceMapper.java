package com.sena.urbantracker.routes.infrastructure.persistence.mapper;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteScheduleModel;

public class RouteSchedulePersistenceMapper {

    private RouteSchedulePersistenceMapper() {}

    public static RouteScheduleModel toModel(RouteScheduleDomain domain) {
        if (domain == null) return null;
        RouteScheduleModel model = new RouteScheduleModel();
        model.setId(domain.getId());
        model.setRoute(RoutePersistenceMapper.toModel(domain.getRoute()));
        model.setDayOfWeek(domain.getDayOfWeek());
        model.setStartTime(domain.getStartTime());
        model.setEndTime(domain.getEndTime());
//        model.setActive(domain.isActive());
        return model;
    }

    public static RouteScheduleDomain toDomain(RouteScheduleModel model) {
        if (model == null) return null;
        RouteScheduleDomain domain = new RouteScheduleDomain();
        domain.setId(model.getId());
        domain.setRoute(RoutePersistenceMapper.toDomain(model.getRoute()));
        domain.setDayOfWeek(model.getDayOfWeek());
        domain.setStartTime(model.getStartTime());
        domain.setEndTime(model.getEndTime());
//        domain.setActive(model.isActive());
        return domain;
    }
}