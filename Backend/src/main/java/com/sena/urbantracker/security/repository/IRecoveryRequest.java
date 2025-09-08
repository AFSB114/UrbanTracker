package com.sena.urbantracker.security.repository;

import com.sena.urbantracker.security.model.entity.RecoveryRequest;
import com.sena.urbantracker.users.model.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRecoveryRequest extends JpaRepository<RecoveryRequest, Integer> {
    Optional<RecoveryRequest> findTopByUserOrderByCreatedAtDesc(UserProfile user);
}
