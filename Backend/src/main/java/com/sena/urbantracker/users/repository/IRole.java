package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.security.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRole extends JpaRepository<Role, Integer> {
    boolean existsByName(String name);
}
