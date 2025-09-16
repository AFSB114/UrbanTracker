package com.sena.urbantracker.routes.repository;

import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.model.entity.RouteWaypoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoutePoint extends JpaRepository<RouteWaypoint, Long> {

    boolean existsByRouteAndSequence(Route route, Integer sequence);
}
