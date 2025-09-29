package com.sena.urbantracker.monitoring.infrastructure.repository.impl;

import com.sena.urbantracker.monitoring.domain.entity.TrackingDomain;
import com.sena.urbantracker.monitoring.domain.repository.TrackingRepository;
import com.sena.urbantracker.monitoring.infrastructure.persistence.mapper.TrackingPersistenceMapper;
import com.sena.urbantracker.monitoring.infrastructure.persistence.model.TrackingModel;
import com.sena.urbantracker.monitoring.infrastructure.repository.jpa.TrackingJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TrackingRepositoryImpl implements TrackingRepository {

    private final TrackingJpaRepository jpaRepository;

    public TrackingRepositoryImpl(TrackingJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public TrackingDomain save(TrackingDomain domain) {
        TrackingModel model = TrackingPersistenceMapper.toModel(domain);
        TrackingModel saved = jpaRepository.save(model);
        return TrackingPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<TrackingDomain> findById(Long id) {
        return jpaRepository.findById(id).map(TrackingPersistenceMapper::toDomain);
    }

    @Override
    public List<TrackingDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(TrackingPersistenceMapper::toDomain)
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
    public TrackingDomain saveAndFlush(TrackingDomain tracking) {
        TrackingModel model = TrackingPersistenceMapper.toModel(tracking);
        TrackingModel saved = jpaRepository.saveAndFlush(model);
        return TrackingPersistenceMapper.toDomain(saved);
    }
}