package com.sena.urbantracker.users.infrastructure.repository.impl;

import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.users.domain.repository.DriverRepository;
import com.sena.urbantracker.users.infrastructure.persistence.mapper.DriverPersistenceMapper;
import com.sena.urbantracker.users.infrastructure.persistence.model.DriverModel;
import com.sena.urbantracker.users.infrastructure.repository.jpa.DriverJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DriverRepositoryImpl implements DriverRepository {

    private final DriverJpaRepository jpaRepository;

    public DriverRepositoryImpl(DriverJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public DriverDomain save(DriverDomain domain) {
        DriverModel model = DriverPersistenceMapper.toModel(domain);
        DriverModel saved = jpaRepository.save(model);
        return DriverPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<DriverDomain> findById(Long id) {
        return jpaRepository.findById(id).map(DriverPersistenceMapper::toDomain);
    }

    @Override
    public List<DriverDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(DriverPersistenceMapper::toDomain)
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
    public boolean existsByUserId(Long userId) {
        return jpaRepository.existsByUserId(userId);
    }
}