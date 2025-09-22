package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.domain.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    boolean existsByName(String name);

    Optional<Role> findByName(String name);

}
