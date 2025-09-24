package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.DriverDomain;

import java.util.List;
import java.util.Optional;

public interface DriverRepository {

    List<DriverDomain> findAll();

    Optional<DriverDomain> findById(Long id);

    DriverDomain save(DriverDomain driver);

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByUserId(Long userId);
}