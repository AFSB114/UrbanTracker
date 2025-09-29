package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteScheduleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface RouteScheduleJpaRepository extends JpaRepository<RouteScheduleModel, Long> {
    List<RouteScheduleModel> findAllByRoute_Id(Long routeId);
}