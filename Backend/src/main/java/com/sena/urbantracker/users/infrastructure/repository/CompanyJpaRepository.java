package com.sena.urbantracker.users.infrastructure.repository;

import com.sena.urbantracker.users.domain.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyJpaRepository extends JpaRepository<Company, Long> {
    boolean existsByNit(String nit);
}