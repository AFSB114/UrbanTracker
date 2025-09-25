package com.sena.urbantracker.users.infrastructure.repository.impl;

import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
import com.sena.urbantracker.users.infrastructure.persistence.mapper.UserProfilePersistenceMapper;
import com.sena.urbantracker.users.infrastructure.persistence.model.UserProfileModel;
import com.sena.urbantracker.users.infrastructure.repository.jpa.UserProfileJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserProfileRepositoryImpl implements UserProfileRepository {

    private final UserProfileJpaRepository jpaRepository;

    public UserProfileRepositoryImpl(UserProfileJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public UserProfileDomain save(UserProfileDomain domain) {
        UserProfileModel model = UserProfilePersistenceMapper.toModel(domain);
        UserProfileModel saved = jpaRepository.save(model);
        return UserProfilePersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<UserProfileDomain> findById(Long id) {
        return jpaRepository.findById(id).map(UserProfilePersistenceMapper::toDomain);
    }

    @Override
    public List<UserProfileDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(UserProfilePersistenceMapper::toDomain)
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
    public Optional<UserProfileDomain> findByEmail(String email) {
        return jpaRepository.findByEmail(email).map(UserProfilePersistenceMapper::toDomain);
    }

    @Override
    public Optional<UserProfileDomain> findByUserId(Long userId) {
        return jpaRepository.findByUserId(userId).map(UserProfilePersistenceMapper::toDomain);
    }
}