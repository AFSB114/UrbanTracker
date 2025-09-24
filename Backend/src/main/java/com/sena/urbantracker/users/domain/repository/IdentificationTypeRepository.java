package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.IdentificationTypeDomain;

import java.util.List;
import java.util.Optional;

public interface IdentificationTypeRepository {

    List<IdentificationTypeDomain> findAll();

    Optional<IdentificationTypeDomain> findById(Long id);

    IdentificationTypeDomain save(IdentificationTypeDomain identificationType);

    void deleteById(Long id);

    boolean existsById(Long id);
}