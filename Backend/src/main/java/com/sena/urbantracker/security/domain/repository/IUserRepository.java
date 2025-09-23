package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.application.dto.response.UserViewDTO;
import com.sena.urbantracker.security.domain.entity.UserDomain;

import java.util.List;
import java.util.Optional;

public interface IUserRepository {

    List<UserDomain> findAll();

    Optional<UserDomain> findById(Long id);

    UserDomain save(UserDomain user);

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByUserName(String userName);

    Optional<UserDomain> findByUserName(String username);

    List<UserViewDTO> getAll();
}