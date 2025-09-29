package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;

import java.util.List;
import java.util.Optional;

public interface RouteScheduleRepository {

    RouteScheduleDomain save(RouteScheduleDomain domain);

    Optional<RouteScheduleDomain> findById(Long id);

    List<RouteScheduleDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    List<RouteScheduleDomain> saveAll(List<RouteScheduleDomain> domainList);

    List<RouteScheduleDomain> findByRoute_Id(Long id);

    void deleteAll(List<RouteScheduleDomain> missingInDto);
}