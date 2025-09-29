package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteTrajectoryDomain;
import com.sena.urbantracker.routes.domain.repository.RouteTrajectoryRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteTrajectoryPersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteTrajectoryModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteTrajectoryJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RouteTrajectoryRepositoryAdapter implements RouteTrajectoryRepository {

    private final RouteTrajectoryJpaRepository jpaRepository;

    public RouteTrajectoryRepositoryAdapter(RouteTrajectoryJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public RouteTrajectoryDomain save(RouteTrajectoryDomain domain) {
        RouteTrajectoryModel model = RouteTrajectoryPersistenceMapper.toModel(domain);
        RouteTrajectoryModel saved = jpaRepository.save(model);
        return RouteTrajectoryPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RouteTrajectoryDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RouteTrajectoryPersistenceMapper::toDomain);
    }

    @Override
    public List<RouteTrajectoryDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(RouteTrajectoryPersistenceMapper::toDomain)
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
}
