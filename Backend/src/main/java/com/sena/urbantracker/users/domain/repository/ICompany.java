package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompany extends JpaRepository<Company, Long> {
    boolean existsByNit(String nit);
}
