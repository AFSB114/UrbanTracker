package com.sena.urbantracker.users.domain.repository;

import com.sena.urbantracker.users.domain.entity.UserIdentification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserIdentification extends JpaRepository<UserIdentification, Long> {
}
