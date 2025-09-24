package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.RouteRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RoutePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class RouteJpaRepositoryImpl implements RouteRepository {

    private final RouteJpaRepository jpaRepository;

    @Override
    public List<RouteDomain> findAll() {
        return jpaRepository.findAll().stream()
                .map(RoutePersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RouteDomain> findById(Long id) {
        return jpaRepository.findById(id)
                .map(RoutePersistenceMapper::toDomain);
    }

    @Override
    public RouteDomain save(RouteDomain route) {
        RouteModel model = RoutePersistenceMapper.toModel(route);
        RouteModel saved = jpaRepository.save(model);
        return RoutePersistenceMapper.toDomain(saved);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    public boolean existsByNumberRoute(Integer numberRoute) {
        return jpaRepository.existsByNumberRoute(numberRoute);
    }
}