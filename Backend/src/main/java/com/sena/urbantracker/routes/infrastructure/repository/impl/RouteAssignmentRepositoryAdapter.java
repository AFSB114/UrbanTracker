package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteAssignmentDomain;
import com.sena.urbantracker.routes.domain.repository.RouteAssignmentRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteAssignmentPersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteAssignmentModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteAssignmentJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RouteAssignmentRepositoryAdapter implements RouteAssignmentRepository {

    private final RouteAssignmentJpaRepository jpaRepository;

    public RouteAssignmentRepositoryAdapter(RouteAssignmentJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public RouteAssignmentDomain save(RouteAssignmentDomain domain) {
        RouteAssignmentModel model = RouteAssignmentPersistenceMapper.toModel(domain);
        RouteAssignmentModel saved = jpaRepository.save(model);
        return RouteAssignmentPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RouteAssignmentDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RouteAssignmentPersistenceMapper::toDomain);
    }

    @Override
    public List<RouteAssignmentDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(RouteAssignmentPersistenceMapper::toDomain)
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
    public List<RouteAssignmentDomain> findByRouteId(Long routeId) {
        return jpaRepository.findByRouteId(routeId)
                .stream()
                .map(RouteAssignmentPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public List<RouteAssignmentDomain> findByVehicleId(Long vehicleId) {
        return jpaRepository.findByVehicleId(vehicleId)
                .stream()
                .map(RouteAssignmentPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<RouteAssignmentDomain> findByRouteIdAndVehicleId(Long routeId, Long vehicleId) {
        return jpaRepository.findByRouteIdAndVehicleId(routeId, vehicleId)
                .map(RouteAssignmentPersistenceMapper::toDomain);
    }
}