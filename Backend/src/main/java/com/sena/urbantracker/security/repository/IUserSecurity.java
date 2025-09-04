package com.sena.urbantracker.security.repository;

import com.sena.urbantracker.security.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserSecurity extends JpaRepository<User, Long> {

    Optional<User> findByUserName(String username);

}
