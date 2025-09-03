package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.users.model.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompany extends JpaRepository<Company, Integer> {
    boolean existsByNit(String nit);
}
