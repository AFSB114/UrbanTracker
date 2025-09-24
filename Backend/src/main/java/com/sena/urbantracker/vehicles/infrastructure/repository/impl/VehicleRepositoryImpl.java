package com.sena.urbantracker.vehicles.infrastructure.repository.impl;

import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleRepository;
import com.sena.urbantracker.vehicles.infrastructure.persistence.mapper.VehiclePersistenceMapper;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import com.sena.urbantracker.vehicles.infrastructure.repository.jpa.VehicleJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VehicleRepositoryImpl implements VehicleRepository {

    private final VehicleJpaRepository jpaRepository;

    public VehicleRepositoryImpl(VehicleJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public VehicleDomain save(VehicleDomain domain) {
        VehicleModel model = VehiclePersistenceMapper.toModel(domain);
        VehicleModel saved = jpaRepository.save(model);
        return VehiclePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<VehicleDomain> findById(Long id) {
        return jpaRepository.findById(id).map(VehiclePersistenceMapper::toDomain);
    }

    @Override
    public List<VehicleDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(VehiclePersistenceMapper::toDomain)
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
    public boolean existsByLicencePlate(String licencePlate) {
        return jpaRepository.existsByLicencePlate(licencePlate);
    }
}