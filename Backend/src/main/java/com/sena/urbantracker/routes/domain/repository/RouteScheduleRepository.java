package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;

import java.util.List;
import java.util.Optional;

public interface RouteScheduleRepository {
    List<RouteScheduleDomain> findAll();
    Optional<RouteScheduleDomain> findById(Long id);
    RouteScheduleDomain save(RouteScheduleDomain routeSchedule);
    void deleteById(Long id);
    boolean existsById(Long id);
}