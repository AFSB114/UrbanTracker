package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteAssignmentDomain;

import java.util.List;
import java.util.Optional;

public interface RouteAssignmentRepository {

    RouteAssignmentDomain save(RouteAssignmentDomain domain);

    Optional<RouteAssignmentDomain> findById(Long id);

    List<RouteAssignmentDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    List<RouteAssignmentDomain> findByRouteId(Long routeId);

    List<RouteAssignmentDomain> findByVehicleId(Long vehicleId);

    Optional<RouteAssignmentDomain> findByRouteIdAndVehicleId(Long routeId, Long vehicleId);
}