package com.sena.urbantracker.security.infrastructure.repository.jpa;

import com.sena.urbantracker.security.infrastructure.persistence.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserModel, Long> {

    boolean existsByUserName(String userName);

    Optional<UserModel> findByUserName(String userName);

}