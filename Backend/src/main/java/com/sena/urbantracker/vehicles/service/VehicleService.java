package com.sena.urbantracker.vehicles.service;

import com.sena.urbantracker.vehicles.model.dto.request.PaginateVehicleCountsDTO;
import com.sena.urbantracker.vehicles.model.dto.response.PaginatedVehicleResponseDTO;
import com.sena.urbantracker.vehicles.model.entity.Vehicle;
import com.sena.urbantracker.vehicles.repository.IVehicle;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final IVehicle iVehicle;

    public List<Vehicle> getAllVehicles() {
        return iVehicle.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return iVehicle.findById(id).get();
    }

}
