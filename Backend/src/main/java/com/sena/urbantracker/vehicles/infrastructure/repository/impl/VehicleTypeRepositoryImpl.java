package com.sena.urbantracker.vehicles.infrastructure.repository.impl;

import com.sena.urbantracker.vehicles.domain.entity.VehicleTypeDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleTypeRepository;
import com.sena.urbantracker.vehicles.infrastructure.persistence.mapper.VehicleTypePersistenceMapper;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleTypeModel;
import com.sena.urbantracker.vehicles.infrastructure.repository.jpa.VehicleTypeJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VehicleTypeRepositoryImpl implements VehicleTypeRepository {

    private final VehicleTypeJpaRepository jpaRepository;

    public VehicleTypeRepositoryImpl(VehicleTypeJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public VehicleTypeDomain save(VehicleTypeDomain domain) {
        VehicleTypeModel model = VehicleTypePersistenceMapper.toModel(domain);
        VehicleTypeModel saved = jpaRepository.save(model);
        return VehicleTypePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<VehicleTypeDomain> findById(Long id) {
        return jpaRepository.findById(id).map(VehicleTypePersistenceMapper::toDomain);
    }

    @Override
    public List<VehicleTypeDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(VehicleTypePersistenceMapper::toDomain)
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
    public boolean existsByName(String name) {
        return jpaRepository.existsByName(name);
    }
}