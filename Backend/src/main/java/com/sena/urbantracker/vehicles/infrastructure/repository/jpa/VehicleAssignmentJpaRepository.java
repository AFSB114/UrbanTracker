package com.sena.urbantracker.vehicles.infrastructure.repository.jpa;

import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleAssignmentModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleAssignmentJpaRepository extends JpaRepository<VehicleAssignmentModel, Long> {
}