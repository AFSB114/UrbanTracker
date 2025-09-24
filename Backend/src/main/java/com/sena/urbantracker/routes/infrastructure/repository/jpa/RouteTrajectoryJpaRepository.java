package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteTrajectoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteTrajectoryJpaRepository extends JpaRepository<RouteTrajectoryModel, Long> {
}