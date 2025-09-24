package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteJpaRepository extends JpaRepository<RouteModel, Long> {

    boolean existsByNumberRoute(Integer numberRoute);
}