package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.domain.entity.RecoveryRequest;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RecoveryRequestRepository extends JpaRepository<RecoveryRequest, Integer> {

    Optional<RecoveryRequest> findTopByUserOrderByCreatedAtDesc(UserProfileDomain user);

    @Modifying
    @Transactional
    long deleteAllByUser(UserProfileDomain user);
}
