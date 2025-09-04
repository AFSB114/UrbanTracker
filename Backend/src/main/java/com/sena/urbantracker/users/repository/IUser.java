package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.security.model.dto.response.UserViewDTO;
import com.sena.urbantracker.security.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IUser extends JpaRepository<User, Long> {

    @Query("""
            SELECT new com.sena.urbantracker.security.model.dto.response.UserViewDTO(
             u.id, u.userName, u.role.id)
             FROM User u
        """)
    List<UserViewDTO> getAll();

    boolean existsByUserName(String userName);

    @Query("SELECT u FROM User u JOIN Driver d ON u.id = d.user.id WHERE d.id = :driverId")
    Optional<User> findByIdDriver(@Param("driverId") Long driverId);

    Optional<User> findByUserName(String username);
}
