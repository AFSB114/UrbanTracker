package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteTrajectoryDomain;

import java.util.List;
import java.util.Optional;

public interface RouteTrajectoryRepository {

    RouteTrajectoryDomain save(RouteTrajectoryDomain domain);

    Optional<RouteTrajectoryDomain> findById(Long id);

    List<RouteTrajectoryDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);
}