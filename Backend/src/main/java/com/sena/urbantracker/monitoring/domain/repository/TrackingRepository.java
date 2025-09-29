package com.sena.urbantracker.monitoring.domain.repository;

import com.sena.urbantracker.monitoring.domain.entity.TrackingDomain;

import java.util.List;
import java.util.Optional;

public interface TrackingRepository {

    TrackingDomain save(TrackingDomain domain);

    Optional<TrackingDomain> findById(Long id);

    List<TrackingDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    TrackingDomain saveAndFlush(TrackingDomain tracking);
}