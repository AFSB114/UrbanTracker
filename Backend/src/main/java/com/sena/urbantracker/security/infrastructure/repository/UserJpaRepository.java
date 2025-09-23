package com.sena.urbantracker.security.infrastructure.repository;

import com.sena.urbantracker.security.application.dto.response.UserViewDTO;
import com.sena.urbantracker.security.infrastructure.persistence.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserModel, Long> {

    @Query("""
                  SELECT new com.sena.urbantracker.security.application.dto.response.UserViewDTO(
                   u.id, u.userName, u.role.id)
                   FROM UserModel u
              """)
    List<UserViewDTO> getAll();

    boolean existsByUserName(String userName);

    Optional<UserModel> findByUserName(String username);
}