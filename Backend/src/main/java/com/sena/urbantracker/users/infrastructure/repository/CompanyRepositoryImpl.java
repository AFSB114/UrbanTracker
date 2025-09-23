package com.sena.urbantracker.users.infrastructure.repository;

import com.sena.urbantracker.users.domain.entity.Company;
import com.sena.urbantracker.users.domain.repository.ICompany;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CompanyRepositoryImpl implements ICompany {

    private final CompanyJpaRepository jpaRepository;

    @Override
    public List<Company> findAll() {
        return jpaRepository.findAll();
    }

    @Override
    public Optional<Company> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Company save(Company company) {
        return jpaRepository.save(company);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public boolean existsByNit(String nit) {
        return jpaRepository.existsByNit(nit);
    }
}