package com.sena.urbantracker.security.infrastructure.repository.impl;

import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.security.infrastructure.persistence.mapper.RolePersistenceMapper;
import com.sena.urbantracker.security.infrastructure.persistence.model.RoleModel;
import com.sena.urbantracker.security.infrastructure.repository.jpa.RoleJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepository {

    private final RoleJpaRepository jpaRepository;

    @Override
    public RoleDomain save(RoleDomain domain) {
        RoleModel model = RolePersistenceMapper.toModel(domain);
        RoleModel saved = jpaRepository.save(model);
        return RolePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RoleDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RolePersistenceMapper::toDomain);
    }

    @Override
    public List<RoleDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(RolePersistenceMapper::toDomain)
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
    public boolean existsByName(String name) {
        return jpaRepository.existsByName(name);
    }

    @Override
    public Optional<RoleDomain> findByName(String name) {
        return jpaRepository.findByName(name).map(RolePersistenceMapper::toDomain);
    }
}