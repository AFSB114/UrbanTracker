package com.sena.urbantracker.security.repository;

import com.sena.urbantracker.security.model.entity.RecoveryRequest;
import com.sena.urbantracker.users.model.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface IRecoveryRequest extends JpaRepository<RecoveryRequest, Integer> {

    Optional<RecoveryRequest> findTopByUserOrderByCreatedAtDesc(UserProfile user);

    @Modifying
    @Transactional
    long deleteAllByUser(UserProfile user);
}
