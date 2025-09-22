package com.sena.urbantracker.routes.infrastructure.repository;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.IRoute;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RoutePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RouteRepositoryImpl implements IRoute {

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

    @Override
    public boolean existsByNumberRoute(Integer numberRoute) {
        return jpaRepository.existsByNumberRoute(numberRoute);
    }
}