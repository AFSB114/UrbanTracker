package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;

import java.util.List;
import java.util.Optional;

public interface RouteRepository {

    RouteDomain save(RouteDomain domain);

    Optional<RouteDomain> findById(Long id);

    List<RouteDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByNumberRoute(Integer numberRoute);

    RouteDomain saveAndFlush(RouteDomain route);
}
