package com.sena.urbantracker.security.infrastructure.repository.impl;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.security.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.sena.urbantracker.security.infrastructure.persistence.model.UserModel;
import com.sena.urbantracker.security.infrastructure.repository.jpa.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final UserJpaRepository jpaRepository;

    @Override
    public UserDomain save(UserDomain domain) {
        UserModel model = UserPersistenceMapper.toModel(domain);
        UserModel saved = jpaRepository.save(model);
        return UserPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<UserDomain> findById(Long id) {
        return jpaRepository.findById(id).map(UserPersistenceMapper::toDomain);
    }

    @Override
    public List<UserDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(UserPersistenceMapper::toDomain)
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
    public boolean existsByUserName(String userName) {
        return jpaRepository.existsByUserName(userName);
    }

    @Override
    public Optional<UserDomain> findByUserName(String username) {
        return jpaRepository.findByUserName(username).map(UserPersistenceMapper::toDomain);
    }
}