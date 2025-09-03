package com.sena.urbantracker.routes.repository;

import com.sena.urbantracker.routes.model.entity.RouteWaypoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoutePoint extends JpaRepository<RouteWaypoint, Integer> {

}
