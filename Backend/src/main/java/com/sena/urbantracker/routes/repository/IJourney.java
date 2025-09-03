package com.sena.urbantracker.routes.repository;

import com.sena.urbantracker.routes.model.entity.Journey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJourney extends JpaRepository<Journey, Integer> {
}
