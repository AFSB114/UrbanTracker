package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;

import java.util.List;
import java.util.Optional;

public interface RouteWaypointRepository {

    RouteWaypointDomain save(RouteWaypointDomain domain);

    Optional<RouteWaypointDomain> findById(Long id);

    List<RouteWaypointDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByRouteAndSequence(RouteDomain route, Integer sequence);

    List<RouteWaypointDomain> findByRouteId(Long routeId);
}
