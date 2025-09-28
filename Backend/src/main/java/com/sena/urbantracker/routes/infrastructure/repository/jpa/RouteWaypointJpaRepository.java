package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteWaypointModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RouteWaypointJpaRepository extends JpaRepository<RouteWaypointModel, Long> {

    boolean existsByRouteAndSequence(RouteModel route, Integer sequence);

    List<RouteWaypointModel> findByRoute_Id(Long routeId);

    Integer countByTypeAndRoute(String type, RouteModel route);

    void deleteByRoute(RouteModel route);

    List<RouteWaypointModel> findByRouteAndType(RouteModel route, String type);

    @Modifying
    @Query("DELETE FROM RouteWaypointModel rw WHERE rw.route.id = :routeId")
    void deleteAllByRoute_Id(Long routeId);
}