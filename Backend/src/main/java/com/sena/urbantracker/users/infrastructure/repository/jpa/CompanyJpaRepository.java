package com.sena.urbantracker.users.infrastructure.repository.jpa;

import com.sena.urbantracker.users.infrastructure.persistence.model.CompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyJpaRepository extends JpaRepository<CompanyModel, Long> {
    boolean existsByNit(String nit);
}