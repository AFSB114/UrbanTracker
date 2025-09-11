package com.sena.urbantracker.vehicles.repository;

import com.sena.urbantracker.vehicles.model.entity.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVehicleType extends JpaRepository<VehicleType, Long> {
}
