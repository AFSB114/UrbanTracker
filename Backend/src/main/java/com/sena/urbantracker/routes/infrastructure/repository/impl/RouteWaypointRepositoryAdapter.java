package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.domain.repository.RouteWaypointRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RoutePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteWaypointPersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteWaypointModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteWaypointJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RouteWaypointRepositoryAdapter implements RouteWaypointRepository {

    private final RouteWaypointJpaRepository jpaRepository;

    public RouteWaypointRepositoryAdapter(RouteWaypointJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public RouteWaypointDomain save(RouteWaypointDomain domain) {
        RouteWaypointModel model = RouteWaypointPersistenceMapper.toModel(domain);
        RouteWaypointModel saved = jpaRepository.save(model);
        return RouteWaypointPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RouteWaypointDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RouteWaypointPersistenceMapper::toDomain);
    }

    @Override
    public List<RouteWaypointDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(RouteWaypointPersistenceMapper::toDomain)
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
    public boolean existsByRouteAndSequence(RouteDomain route, Integer sequence) {
        RouteModel routeModel = RoutePersistenceMapper.toModel(route);
        return jpaRepository.existsByRouteAndSequence(routeModel, sequence);
    }

    @Override
    public List<RouteWaypointDomain> findByRouteId(Long routeId) {
        return jpaRepository.findByRoute_Id(routeId)
                .stream()
                .map(RouteWaypointPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public void saveAll(List<RouteWaypointDomain> waypoints) {
        jpaRepository.saveAll(waypoints.stream().map(RouteWaypointPersistenceMapper::toModel).toList());
    }

    public Integer countByTypeAndRoute(String type,RouteDomain routeDomain) {
        RouteModel routeModel = RoutePersistenceMapper.toModel(routeDomain);
        return jpaRepository.countByTypeAndRoute(type, routeModel);
    }

    @Override
    public void deleteByRoute(RouteDomain routeDomain) {
        jpaRepository.deleteAllByRoute_Id(routeDomain.getId());
        System.out.println("Se han eliminado todos los waypoints de la ruta: " +  routeDomain.getId());
    }

    public List<RouteWaypointDomain> findByRouteAndType(RouteDomain route,  String type) {
        RouteModel routeModel = RoutePersistenceMapper.toModel(route);
        return jpaRepository.findByRouteAndType(routeModel, type)
                .stream()
                .map(RouteWaypointPersistenceMapper::toDomain)
                .toList();
    }


}
