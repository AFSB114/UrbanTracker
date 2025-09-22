package com.sena.urbantracker.vehicles.domain.repository;

import com.sena.urbantracker.vehicles.domain.entity.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVehicleType extends JpaRepository<VehicleType, Long> {

    boolean existsByName(String name);
}
