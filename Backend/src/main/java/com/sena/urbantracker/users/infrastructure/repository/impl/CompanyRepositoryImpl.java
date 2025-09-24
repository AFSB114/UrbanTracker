package com.sena.urbantracker.users.infrastructure.repository.impl;

import com.sena.urbantracker.users.domain.entity.CompanyDomain;
import com.sena.urbantracker.users.domain.repository.CompanyRepository;
import com.sena.urbantracker.users.infrastructure.persistence.mapper.CompanyPersistenceMapper;
import com.sena.urbantracker.users.infrastructure.persistence.model.CompanyModel;
import com.sena.urbantracker.users.infrastructure.repository.jpa.CompanyJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CompanyRepositoryImpl implements CompanyRepository {

    private final CompanyJpaRepository jpaRepository;

    public CompanyRepositoryImpl(CompanyJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public CompanyDomain save(CompanyDomain domain) {
        CompanyModel model = CompanyPersistenceMapper.toModel(domain);
        CompanyModel saved = jpaRepository.save(model);
        return CompanyPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<CompanyDomain> findById(Long id) {
        return jpaRepository.findById(id).map(CompanyPersistenceMapper::toDomain);
    }

    @Override
    public List<CompanyDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(CompanyPersistenceMapper::toDomain)
                .toList();
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