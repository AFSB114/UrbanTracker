package com.sena.urbantracker.users.infrastructure.repository.jpa;

import com.sena.urbantracker.users.infrastructure.persistence.model.IdentificationTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentificationTypeJpaRepository extends JpaRepository<IdentificationTypeModel, Long> {
}