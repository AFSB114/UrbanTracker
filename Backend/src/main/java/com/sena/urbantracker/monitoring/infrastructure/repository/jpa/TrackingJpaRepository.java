package com.sena.urbantracker.monitoring.infrastructure.repository.jpa;

import com.sena.urbantracker.monitoring.infrastructure.persistence.model.TrackingModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackingJpaRepository extends JpaRepository<TrackingModel, Long> {
    // Additional query methods if needed
}