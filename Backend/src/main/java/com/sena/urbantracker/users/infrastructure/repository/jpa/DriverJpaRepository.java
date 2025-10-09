package com.sena.urbantracker.users.infrastructure.repository.jpa;

import com.sena.urbantracker.users.application.dto.response.DriverAssignedVehicleRouteResDto;
import com.sena.urbantracker.users.infrastructure.persistence.model.DriverModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverJpaRepository extends JpaRepository<DriverModel, Long> {
    boolean existsByUserId(Long userId);

    @Query("SELECT new com.sena.urbantracker.users.application.dto.response.DriverAssignedVehicleRouteResDto(v.licencePlate, r.numberRoute) " +
           "FROM DriverModel d " +
           "JOIN VehicleAssignmentModel va ON d.id = va.driver.id AND va.assignmentStatus = 'ACTIVE' " +
           "JOIN VehicleModel v ON va.vehicle.id = v.id " +
           "LEFT JOIN RouteTrajectoryModel rt ON v.id = rt.vehicle.id AND rt.trajectoryStatus = 'ACTIVE' " +
           "LEFT JOIN RouteModel r ON rt.route.id = r.id " +
           "WHERE d.id = :driverId")
    Optional<DriverAssignedVehicleRouteResDto> findAssignedVehicleAndRouteByDriverId(@Param("driverId") Long driverId);
}