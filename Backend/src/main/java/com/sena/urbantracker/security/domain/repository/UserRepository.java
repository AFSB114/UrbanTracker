package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.domain.entity.UserDomain;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    UserDomain save(UserDomain domain);

    Optional<UserDomain> findById(Long id);

    List<UserDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByUserName(String userName);

    Optional<UserDomain> findByUserName(String username);

}
