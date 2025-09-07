package com.sena.urbantracker.security.repository;

import com.sena.urbantracker.security.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRole extends JpaRepository<Role, Long> {
    boolean existsByName(String name);
}
