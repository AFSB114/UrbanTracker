package com.sena.urbantracker.vehicles.domain.repository;

import com.sena.urbantracker.vehicles.domain.entity.VehicleTypeDomain;

import java.util.List;
import java.util.Optional;

public interface VehicleTypeRepository {

    VehicleTypeDomain save(VehicleTypeDomain domain);

    Optional<VehicleTypeDomain> findById(Long id);

    List<VehicleTypeDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByName(String name);
}