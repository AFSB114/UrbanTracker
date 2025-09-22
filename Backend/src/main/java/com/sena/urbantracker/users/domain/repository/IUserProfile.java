package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserProfile extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByEmail(String email);
}
