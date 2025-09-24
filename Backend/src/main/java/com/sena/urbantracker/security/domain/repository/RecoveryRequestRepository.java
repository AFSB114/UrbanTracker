package com.sena.urbantracker.security.domain.repository;

import com.sena.urbantracker.security.domain.entity.RecoveryRequestDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;

import java.util.List;
import java.util.Optional;

public interface RecoveryRequestRepository {

    RecoveryRequestDomain save(RecoveryRequestDomain domain);

    Optional<RecoveryRequestDomain> findById(Long id);

    List<RecoveryRequestDomain> findAll();

    void deleteById(Long id);

    boolean existsById(Long id);

    Optional<RecoveryRequestDomain> findTopByUserOrderByCreatedAtDesc(UserDomain user);

    long deleteAllByUser(UserDomain user);

    void delete(RecoveryRequestDomain recoveryRequest);
}
