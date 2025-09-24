package com.sena.urbantracker.vehicles.infrastructure.repository.jpa;

import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleJpaRepository extends JpaRepository<VehicleModel, Long> {

    boolean existsByLicencePlate(String licencePlate);
}