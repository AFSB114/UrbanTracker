package com.sena.urbantracker.security.infrastructure.repository.jpa;

import com.sena.urbantracker.security.infrastructure.persistence.model.RecoveryRequestModel;
import com.sena.urbantracker.security.infrastructure.persistence.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RecoveryRequestJpaRepository extends JpaRepository<RecoveryRequestModel, Long> {

    Optional<RecoveryRequestModel> findTopByUserOrderByCreatedAtDesc(UserModel user);

    @Modifying
    @Transactional
    long deleteAllByUser(UserModel user);
}