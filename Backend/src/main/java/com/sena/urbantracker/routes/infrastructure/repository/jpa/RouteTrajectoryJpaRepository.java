package com.sena.urbantracker.routes.infrastructure.repository.jpa;

import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteTrajectoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RouteTrajectoryJpaRepository extends JpaRepository<RouteTrajectoryModel, Long> {
    @Query("SELECT rt FROM RouteTrajectoryModel rt JOIN rt.vehicle v JOIN v.vehicleAssignments va WHERE va.driver.id = :driverId AND va.assignmentStatus = 'ACTIVE'")
    List<RouteTrajectoryModel> findByDriverId(@Param("driverId") Long driverId);
}