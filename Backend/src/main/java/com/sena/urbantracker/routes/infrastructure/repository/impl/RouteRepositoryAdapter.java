package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.RouteRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RoutePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RouteRepositoryAdapter implements RouteRepository {

    private final RouteJpaRepository jpaRepository;

    public RouteRepositoryAdapter(RouteJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public RouteDomain save(RouteDomain domain) {
        RouteModel model = RoutePersistenceMapper.toModel(domain);
        RouteModel saved = jpaRepository.save(model);
        return RoutePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RouteDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RoutePersistenceMapper::toDomain);
    }

    @Override
    public List<RouteDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(RoutePersistenceMapper::toDomain)
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
    public boolean existsByNumberRoute(Integer numberRoute) {
        return jpaRepository.existsByNumberRoute(numberRoute);
    }

    @Override
    public RouteDomain saveAndFlush(RouteDomain route) {
        RouteModel model = RoutePersistenceMapper.toModel(route);
        RouteModel saved = jpaRepository.saveAndFlush(model);
        return RoutePersistenceMapper.toDomain(saved);
    }
}
