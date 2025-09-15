package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.users.model.entity.IdentificationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IIdentificationType extends JpaRepository<IdentificationType, Long> {
}
