package com.sena.urbantracker.security.infrastructure.repository.jpa;

import com.sena.urbantracker.security.infrastructure.persistence.model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleJpaRepository extends JpaRepository<RoleModel, Long> {

    boolean existsByName(String name);

    Optional<RoleModel> findByName(String name);

}