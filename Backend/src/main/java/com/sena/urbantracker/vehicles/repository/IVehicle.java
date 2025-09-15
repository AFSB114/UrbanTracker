package com.sena.urbantracker.vehicles.repository;

import com.sena.urbantracker.vehicles.model.entity.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IVehicle extends JpaRepository<Vehicle, Long> {

    boolean existsByLicencePlate(String licencePlate);
}
