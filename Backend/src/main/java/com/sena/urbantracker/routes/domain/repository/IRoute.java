package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteDomain;

import java.util.List;
import java.util.Optional;

public interface IRoute {

    List<RouteDomain> findAll();

    Optional<RouteDomain> findById(Long id);

    RouteDomain save(RouteDomain route);

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByNumberRoute(Integer numberRoute);
}
