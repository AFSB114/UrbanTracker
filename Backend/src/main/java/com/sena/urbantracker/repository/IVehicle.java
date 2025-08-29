package com.sena.urbantracker.repository;

import com.sena.urbantracker.DTO.PaginateVehicleCountsDTO;
import com.sena.urbantracker.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IVehicle extends JpaRepository<Vehicle, Integer> {

    @Query("SELECT COUNT(v) FROM vehicle v")
    Integer countVehicles();

    @Query("""
        SELECT new com.sena.urbantracker.DTO.PaginateVehicleCountsDTO(
            v.brand,
            v.licencePlate,
            v.model,
            v.status,
            c.name,
            u.userName
        )
        FROM vehicle v
        JOIN v.company c
        JOIN v.user u
        """)
    List<PaginateVehicleCountsDTO> getAllVehicle();

}
