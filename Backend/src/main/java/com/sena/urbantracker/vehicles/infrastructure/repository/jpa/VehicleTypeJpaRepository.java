package com.sena.urbantracker.vehicles.infrastructure.repository.jpa;

import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleTypeJpaRepository extends JpaRepository<VehicleTypeModel, Long> {

    boolean existsByName(String name);
}