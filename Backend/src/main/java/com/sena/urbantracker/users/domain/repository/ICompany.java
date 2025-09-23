package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.Company;

import java.util.List;
import java.util.Optional;

public interface ICompany {

    List<Company> findAll();

    Optional<Company> findById(Long id);

    Company save(Company company);

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByNit(String nit);
}
