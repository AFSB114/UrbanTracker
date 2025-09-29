package com.sena.urbantracker.routes.infrastructure.repository.impl;

import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.domain.repository.RouteScheduleRepository;
import com.sena.urbantracker.routes.infrastructure.persistence.mapper.RouteSchedulePersistenceMapper;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteScheduleModel;
import com.sena.urbantracker.routes.infrastructure.repository.jpa.RouteScheduleJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RouteScheduleRepositoryAdapter implements RouteScheduleRepository {

    private final RouteScheduleJpaRepository jpaRepository;

    @Override
    public RouteScheduleDomain save(RouteScheduleDomain domain) {
        RouteScheduleModel model = RouteSchedulePersistenceMapper.toModel(domain);
        RouteScheduleModel saved = jpaRepository.save(model);
        return RouteSchedulePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RouteScheduleDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RouteSchedulePersistenceMapper::toDomain);
    }

    @Override
    public List<RouteScheduleDomain> findAll() {
        return jpaRepository.findAll().stream().map(RouteSchedulePersistenceMapper::toDomain).toList();
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
    public List<RouteScheduleDomain> saveAll(List<RouteScheduleDomain> domainList) {
        List<RouteScheduleModel> modelList = domainList.stream().map(RouteSchedulePersistenceMapper::toModel).toList();
        return jpaRepository.saveAll(modelList).stream().map(RouteSchedulePersistenceMapper::toDomain).toList();
    }

    @Override
    public List<RouteScheduleDomain> findByRoute_Id(Long id) {
        return jpaRepository.findAllByRoute_Id(id).stream().map(RouteSchedulePersistenceMapper::toDomain).toList();
    }

    @Override
    public void deleteAll(List<RouteScheduleDomain> missingInDto) {
        jpaRepository.deleteAll(missingInDto.stream().map(RouteSchedulePersistenceMapper::toModel).toList());
    }
}
