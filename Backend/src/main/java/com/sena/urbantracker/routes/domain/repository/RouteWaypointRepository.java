package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.shared.domain.repository.RepositoryOperations;

import java.util.List;

public interface RouteWaypointRepository extends BaseRepository<RouteWaypointDomain, Long> {
    boolean existsByRouteAndSequence(RouteDomain route, Integer sequence);

    List<RouteWaypointDomain> findByRouteId(Long routeId);
}
