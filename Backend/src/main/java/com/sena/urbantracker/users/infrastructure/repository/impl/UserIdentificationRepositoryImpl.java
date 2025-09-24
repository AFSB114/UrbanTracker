package com.sena.urbantracker.users.infrastructure.repository.impl;

import com.sena.urbantracker.users.domain.entity.UserIdentificationDomain;
import com.sena.urbantracker.users.domain.repository.UserIdentificationRepository;
import com.sena.urbantracker.users.infrastructure.persistence.mapper.UserIdentificationPersistenceMapper;
import com.sena.urbantracker.users.infrastructure.persistence.model.UserIdentificationModel;
import com.sena.urbantracker.users.infrastructure.repository.jpa.UserIdentificationJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserIdentificationRepositoryImpl implements UserIdentificationRepository {

    private final UserIdentificationJpaRepository jpaRepository;

    public UserIdentificationRepositoryImpl(UserIdentificationJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public UserIdentificationDomain save(UserIdentificationDomain domain) {
        UserIdentificationModel model = UserIdentificationPersistenceMapper.toModel(domain);
        UserIdentificationModel saved = jpaRepository.save(model);
        return UserIdentificationPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<UserIdentificationDomain> findById(Long id) {
        return jpaRepository.findById(id).map(UserIdentificationPersistenceMapper::toDomain);
    }

    @Override
    public List<UserIdentificationDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(UserIdentificationPersistenceMapper::toDomain)
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