package com.sena.urbantracker.users.repository;

import com.sena.urbantracker.users.model.entity.UserIdentification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserIdentification extends JpaRepository<UserIdentification, Long> {
}
