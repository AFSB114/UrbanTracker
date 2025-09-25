package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.UserProfileDomain;

import java.util.List;
import java.util.Optional;

public interface UserProfileRepository {

    List<UserProfileDomain> findAll();

    Optional<UserProfileDomain> findById(Long id);

    UserProfileDomain save(UserProfileDomain userProfile);

    void deleteById(Long id);

    boolean existsById(Long id);

    Optional<UserProfileDomain> findByEmail(String email);

    Optional<UserProfileDomain> findByUserId(Long userId);
}