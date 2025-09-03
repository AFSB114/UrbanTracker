package com.sena.urbantracker.routes.repository;

import com.sena.urbantracker.routes.model.entity.RoutePoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoutePoint extends JpaRepository<RoutePoint, Integer> {

}
