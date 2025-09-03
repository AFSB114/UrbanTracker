package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.security.model.dto.response.UserViewDTO;
import com.sena.urbantracker.security.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IUser extends JpaRepository<User, Integer> {

    @Query("""
            SELECT new com.sena.urbantracker.DTO.UserViewDTO(
             u.id, u.userName, u.role.id)
             FROM users u
        """)
    List<UserViewDTO> getAll();

    boolean existsByUserName(String userName);

    Optional<User> findByIdDriver(String driverId);

    Optional<User> findByUserName(String username);
}
