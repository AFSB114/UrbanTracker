package com.sena.urbantracker.vehicles.infrastructure.repository.jpa;

import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleAssignmentModel;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VehicleAssignmentJpaRepository extends JpaRepository<VehicleAssignmentModel, Long> {

    @Query("SELECT va FROM VehicleAssignmentModel va WHERE va.driver.user.id = :userId AND va.assignmentStatus = :status AND va.active = true")
    Optional<VehicleAssignmentModel> findActiveByUserId(@Param("userId") Long userId, @Param("status") AssigmentStatusType status);
}