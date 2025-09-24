package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.CompanyDomain;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository {

    List<CompanyDomain> findAll();

    Optional<CompanyDomain> findById(Long id);

    CompanyDomain save(CompanyDomain company);

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByNit(String nit);
}