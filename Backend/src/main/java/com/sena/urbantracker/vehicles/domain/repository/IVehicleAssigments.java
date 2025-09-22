package com.sena.urbantracker.vehicles.domain.repository;

import com.sena.urbantracker.vehicles.domain.entity.VehicleAssigments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVehicleAssigments extends JpaRepository<VehicleAssigments, Long> {
}
