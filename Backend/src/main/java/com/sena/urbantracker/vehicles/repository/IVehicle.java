package com.sena.urbantracker.vehicles.repository;

import com.sena.urbantracker.vehicles.model.dto.request.PaginateVehicleCountsDTO;
import com.sena.urbantracker.vehicles.model.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IVehicle extends JpaRepository<Vehicle, Long> {

    @Query("SELECT COUNT(v) FROM Vehicle v")
    Integer countVehicles();

}
