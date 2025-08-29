package com.sena.urbantracker.service;

import com.sena.urbantracker.DTO.PaginateVehicleCountsDTO;
import com.sena.urbantracker.model.Vehicle;
import com.sena.urbantracker.repository.IVehicle;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final IVehicle iVehicle;

    public List<Vehicle> getAllVehicles() {
        return iVehicle.findAll();
    }

    public Vehicle getVehicleById(int id) {
        return iVehicle.findById(id).get();
    }

    public Integer conuntVehicle() {
        return iVehicle.countVehicles();
    }

    public List<PaginateVehicleCountsDTO> getAllVehicle() {
        return iVehicle.getAllVehicle();
    }

}
