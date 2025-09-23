package com.sena.urbantracker.routes.infrastructure.repository;

import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteWaypointModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RouteWaypointJpaRepository extends JpaRepository<RouteWaypointModel, Long> {

    boolean existsByRouteAndSequence(RouteModel route, Integer sequence);

    List<RouteWaypointModel> findByRoute_Id(Long routeId);
}