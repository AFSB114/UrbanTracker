package com.sena.urbantracker.vehicles.controller;

import com.sena.urbantracker.vehicles.model.dto.request.VehicleResponseDTO;
import com.sena.urbantracker.vehicles.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/vehicle")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

//@GetMapping("/")
    //  public ResponseEntity<?> getAllVehicles() {
    //    var vehicles = vehicleService.getAllVehicle();
    //    var total = vehicleService.conuntVehicle();

    //     return ResponseEntity.ok(new VehicleResponseDTO(vehicles, total));
    //}

}
