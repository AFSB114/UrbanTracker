package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteTrajectoryDomain;
import com.sena.urbantracker.routes.domain.repository.RouteTrajectoryRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteTrajectoryPersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteTrajectoryModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteTrajectoryJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class RouteTrajectoryJpaRepositoryImpl implements RouteTrajectoryRepository {

    private final RouteTrajectoryJpaRepository jpaRepository;

    @Override
    public List<RouteTrajectoryDomain> findAll() {
        return jpaRepository.findAll().stream()
                .map(RouteTrajectoryPersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RouteTrajectoryDomain> findById(Long id) {
        return jpaRepository.findById(id)
                .map(RouteTrajectoryPersistenceMapper::toDomain);
    }

    @Override
    public RouteTrajectoryDomain save(RouteTrajectoryDomain routeTrajectory) {
        RouteTrajectoryModel model = RouteTrajectoryPersistenceMapper.toModel(routeTrajectory);
        RouteTrajectoryModel saved = jpaRepository.save(model);
        return RouteTrajectoryPersistenceMapper.toDomain(saved);
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