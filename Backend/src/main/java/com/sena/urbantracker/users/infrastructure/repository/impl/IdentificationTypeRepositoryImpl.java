package com.sena.urbantracker.users.infrastructure.repository.impl;

import com.sena.urbantracker.users.domain.entity.IdentificationTypeDomain;
import com.sena.urbantracker.users.domain.repository.IdentificationTypeRepository;
import com.sena.urbantracker.users.infrastructure.persistence.mapper.IdentificationTypePersistenceMapper;
import com.sena.urbantracker.users.infrastructure.persistence.model.IdentificationTypeModel;
import com.sena.urbantracker.users.infrastructure.repository.jpa.IdentificationTypeJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class IdentificationTypeRepositoryImpl implements IdentificationTypeRepository {

    private final IdentificationTypeJpaRepository jpaRepository;

    public IdentificationTypeRepositoryImpl(IdentificationTypeJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public IdentificationTypeDomain save(IdentificationTypeDomain domain) {
        IdentificationTypeModel model = IdentificationTypePersistenceMapper.toModel(domain);
        IdentificationTypeModel saved = jpaRepository.save(model);
        return IdentificationTypePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<IdentificationTypeDomain> findById(Long id) {
        return jpaRepository.findById(id).map(IdentificationTypePersistenceMapper::toDomain);
    }

    @Override
    public List<IdentificationTypeDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(IdentificationTypePersistenceMapper::toDomain)
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
}