package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.domain.entity.RoleDomain;

import java.util.List;
import java.util.Optional;

public interface RoleRepository {

    RoleDomain save(RoleDomain domain);

    Optional<RoleDomain> findById(Long id);

    List<RoleDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    boolean existsByName(String name);

    Optional<RoleDomain> findByName(String name);

}
