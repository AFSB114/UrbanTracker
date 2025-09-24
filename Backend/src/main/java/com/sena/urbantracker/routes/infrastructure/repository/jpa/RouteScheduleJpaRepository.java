package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteScheduleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteScheduleJpaRepository extends JpaRepository<RouteScheduleModel, Long> {
}