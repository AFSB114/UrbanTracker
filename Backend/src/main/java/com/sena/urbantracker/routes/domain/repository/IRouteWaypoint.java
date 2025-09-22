package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.Route;
import com.sena.urbantracker.routes.domain.entity.RouteWaypoint;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IRouteWaypoint extends JpaRepository<RouteWaypoint, Long> {

    boolean existsByRouteAndSequence(Route route, Integer sequence);

    List<RouteWaypoint> findByRoute_Id(Long routeId);

    List<RouteWaypoint> findByRoute_Id(Long routeId, Sort sort, Limit limit);
}
