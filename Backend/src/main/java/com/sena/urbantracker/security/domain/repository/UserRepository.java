package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.application.dto.response.UserViewDTO;
import com.sena.urbantracker.security.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
                 SELECT new com.sena.urbantracker.security.application.dto.response.UserViewDTO(
                  u.id, u.userName, u.role.id)
                  FROM User u
             """)
    List<UserViewDTO> getAll();

    boolean existsByUserName(String userName);

    Optional<User> findByUserName(String username);

}
