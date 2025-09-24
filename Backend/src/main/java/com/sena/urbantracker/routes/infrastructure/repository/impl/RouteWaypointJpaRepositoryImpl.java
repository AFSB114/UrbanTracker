package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.domain.repository.RouteWaypointRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RoutePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteWaypointPersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteWaypointModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteWaypointJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class RouteWaypointJpaRepositoryImpl implements RouteWaypointRepository {

    private final RouteWaypointJpaRepository jpaRepository;

    @Override
    public List<RouteWaypointDomain> findAll() {
        return jpaRepository.findAll().stream()
                .map(RouteWaypointPersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RouteWaypointDomain> findById(Long id) {
        return jpaRepository.findById(id)
                .map(RouteWaypointPersistenceMapper::toDomain);
    }

    @Override
    public RouteWaypointDomain save(RouteWaypointDomain routeWaypoint) {
        RouteWaypointModel model = RouteWaypointPersistenceMapper.toModel(routeWaypoint);
        RouteWaypointModel saved = jpaRepository.save(model);
        return RouteWaypointPersistenceMapper.toDomain(saved);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }


    public boolean existsByRouteAndSequence(RouteDomain route, Integer sequence) {
        RouteModel routeModel = RoutePersistenceMapper.toModel(route);
        return jpaRepository.existsByRouteAndSequence(routeModel, sequence);
    }


    public List<RouteWaypointDomain> findByRouteId(Long routeId) {
        return jpaRepository.findByRoute_Id(routeId).stream()
                .map(RouteWaypointPersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }
}