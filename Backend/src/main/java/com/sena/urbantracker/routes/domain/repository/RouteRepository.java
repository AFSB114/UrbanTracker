package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;


public interface RouteRepository extends BaseRepository<RouteDomain, Long> {
    boolean existsByNumberRoute(Integer numberRoute);
}
