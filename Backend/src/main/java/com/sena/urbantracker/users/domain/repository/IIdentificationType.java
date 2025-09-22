package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.IdentificationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IIdentificationType extends JpaRepository<IdentificationType, Long> {
}
