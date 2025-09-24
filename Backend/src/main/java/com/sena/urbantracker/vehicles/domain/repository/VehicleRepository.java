package com.sena.urbantracker.vehicles.domain.repository;

import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository {

    VehicleDomain save(VehicleDomain domain);

    Optional<VehicleDomain> findById(Long id);

    List<VehicleDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByLicencePlate(String licencePlate);
}