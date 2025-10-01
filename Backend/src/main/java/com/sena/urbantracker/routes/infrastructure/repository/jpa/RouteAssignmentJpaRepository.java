package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteAssignmentModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RouteAssignmentJpaRepository extends JpaRepository<RouteAssignmentModel, Long> {

    List<RouteAssignmentModel> findByRouteId(Long routeId);

    List<RouteAssignmentModel> findByVehicleId(Long vehicleId);

    Optional<RouteAssignmentModel> findByRouteIdAndVehicleId(Long routeId, Long vehicleId);
}