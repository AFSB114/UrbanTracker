package com.sena.urbantracker.vehicles.domain.repository;

import com.sena.urbantracker.vehicles.domain.entity.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IVehicle extends JpaRepository<Vehicle, Long> {

    boolean existsByLicencePlate(String licencePlate);
}
