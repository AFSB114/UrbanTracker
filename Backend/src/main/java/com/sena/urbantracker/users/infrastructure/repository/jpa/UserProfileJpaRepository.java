package com.sena.urbantracker.users.infrastructure.repository.jpa;

import com.sena.urbantracker.users.infrastructure.persistence.model.UserProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileJpaRepository extends JpaRepository<UserProfileModel, Long> {
}