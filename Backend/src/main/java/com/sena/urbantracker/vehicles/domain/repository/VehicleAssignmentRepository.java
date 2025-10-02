package com.sena.urbantracker.vehicles.domain.repository;

import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;

import java.util.List;
import java.util.Optional;

public interface VehicleAssignmentRepository {

    VehicleAssignmentDomain save(VehicleAssignmentDomain domain);

    Optional<VehicleAssignmentDomain> findById(Long id);

    List<VehicleAssignmentDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    Optional<VehicleAssignmentDomain> findActiveByUserId(Long userId, AssigmentStatusType status);

    List<VehicleAssignmentDomain> findByRouteId(Long routeId);

    List<VehicleAssignmentDomain> findByVehicleId(Long vehicleId);
}