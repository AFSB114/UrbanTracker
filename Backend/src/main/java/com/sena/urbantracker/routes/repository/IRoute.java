package com.sena.urbantracker.routes.repository;

import com.sena.urbantracker.routes.model.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoute extends JpaRepository<Route, Integer> {
}
