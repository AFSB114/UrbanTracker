package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDriver extends JpaRepository<Driver, Long> {
}
