package com.sena.urbantracker.security.infrastructure.repository;

import com.sena.urbantracker.security.application.dto.response.UserViewDTO;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.IUserRepository;
import com.sena.urbantracker.security.infrastructure.persistence.mapper.UserPersistenceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements IUserRepository {

    private final UserJpaRepository userJpaRepository;

    @Override
    public List<UserDomain> findAll() {
        return userJpaRepository.findAll().stream()
                .map(UserPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<UserDomain> findById(Long id) {
        return userJpaRepository.findById(id)
                .map(UserPersistenceMapper::toDomain);
    }

    @Override
    public UserDomain save(UserDomain user) {
        var model = UserPersistenceMapper.toModel(user);
        var savedModel = userJpaRepository.save(model);
        return UserPersistenceMapper.toDomain(savedModel);
    }

    @Override
    public void deleteById(Long id) {
        userJpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return userJpaRepository.existsById(id);
    }

    @Override
    public boolean existsByUserName(String userName) {
        return userJpaRepository.existsByUserName(userName);
    }

    @Override
    public Optional<UserDomain> findByUserName(String username) {
        return userJpaRepository.findByUserName(username)
                .map(UserPersistenceMapper::toDomain);
    }

    @Override
    public List<UserViewDTO> getAll() {
        return userJpaRepository.getAll();
    }
}