package com.sena.urbantracker.routes.domain.repository;

import com.sena.urbantracker.routes.domain.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoute extends JpaRepository<Route, Long> {

    boolean existsByNumberRoute(Integer numberRoute);
}
