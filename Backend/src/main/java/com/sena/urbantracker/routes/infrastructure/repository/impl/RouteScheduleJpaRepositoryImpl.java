package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.domain.repository.RouteScheduleRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteSchedulePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteScheduleModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteScheduleJpaRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
class RouteScheduleRepositoryAdapter implements RouteScheduleRepository {

    private final RouteScheduleJpaRepository jpaRepository;

    @PostConstruct
    public void init() {
        System.out.println("RouteScheduleRepositoryAdapter initialized");
    }

    @Override
    public List<RouteScheduleDomain> findAll() {
        return jpaRepository.findAll().stream()
                .map(RouteSchedulePersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RouteScheduleDomain> findById(Long id) {
        return jpaRepository.findById(id)
                .map(RouteSchedulePersistenceMapper::toDomain);
    }

    @Override
    public RouteScheduleDomain save(RouteScheduleDomain routeSchedule) {
        RouteScheduleModel model = RouteSchedulePersistenceMapper.toModel(routeSchedule);
        RouteScheduleModel saved = jpaRepository.save(model);
        return RouteSchedulePersistenceMapper.toDomain(saved);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }
}

