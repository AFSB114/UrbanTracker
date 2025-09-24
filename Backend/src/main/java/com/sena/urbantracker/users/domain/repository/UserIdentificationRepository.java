package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.UserIdentificationDomain;

import java.util.List;
import java.util.Optional;

public interface UserIdentificationRepository {

    List<UserIdentificationDomain> findAll();

    Optional<UserIdentificationDomain> findById(Long id);

    UserIdentificationDomain save(UserIdentificationDomain userIdentification);

    void deleteById(Long id);

    boolean existsById(Long id);
}