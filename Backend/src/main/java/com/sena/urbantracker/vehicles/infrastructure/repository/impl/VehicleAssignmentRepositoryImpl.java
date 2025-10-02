package com.sena.urbantracker.vehicles.infrastructure.repository.impl;

import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleAssignmentRepository;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import com.sena.urbantracker.vehicles.infrastructure.persistence.mapper.VehicleAssignmentPersistenceMapper;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleAssignmentModel;
import com.sena.urbantracker.vehicles.infrastructure.repository.jpa.VehicleAssignmentJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VehicleAssignmentRepositoryImpl implements VehicleAssignmentRepository {

    private final VehicleAssignmentJpaRepository jpaRepository;

    public VehicleAssignmentRepositoryImpl(VehicleAssignmentJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public VehicleAssignmentDomain save(VehicleAssignmentDomain domain) {
        VehicleAssignmentModel model = VehicleAssignmentPersistenceMapper.toModel(domain);
        VehicleAssignmentModel saved = jpaRepository.save(model);
        return VehicleAssignmentPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<VehicleAssignmentDomain> findById(Long id) {
        return jpaRepository.findById(id).map(VehicleAssignmentPersistenceMapper::toDomain);
    }

    @Override
    public List<VehicleAssignmentDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(VehicleAssignmentPersistenceMapper::toDomain)
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
    public Optional<VehicleAssignmentDomain> findActiveByUserId(Long userId, AssigmentStatusType status) {
        return jpaRepository.findActiveByUserId(userId, status)
                .map(VehicleAssignmentPersistenceMapper::toDomain);
    }

    @Override
    public List<VehicleAssignmentDomain> findByRouteId(Long routeId) {
        return jpaRepository.findByRouteId(routeId)
                .stream()
                .map(VehicleAssignmentPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public List<VehicleAssignmentDomain> findByVehicleId(Long vehicleId) {
        return jpaRepository.findByVehicleId(vehicleId)
                .stream()
                .map(VehicleAssignmentPersistenceMapper::toDomain)
                .toList();
    }
}