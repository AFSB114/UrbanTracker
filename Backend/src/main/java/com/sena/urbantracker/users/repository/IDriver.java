package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.users.model.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDriver extends JpaRepository<Driver, Long> {
}
