package com.sena.urbantracker.vehicles.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/vehicle")
@RequiredArgsConstructor
public class VehicleController extends BaseController<VehicleDto, Long> {

    public VehicleController(ServiceFactory serviceFactory) {
        this.serviceFactory = serviceFactory;
    }

    @Override
    protected EntityType getEntityType() {
        return EntityType.VEHICLE;
    }

    @Override
    protected Class<VehicleDto> getDtoClass() {
        return null;
    }

    //@GetMapping("/")
    //  public ResponseEntity<?> getAllVehicles() {
    //    var vehicles = vehicleService.getAllVehicle();
    //    var total = vehicleService.conuntVehicle();

    //     return ResponseEntity.ok(new VehicleResponseDTO(vehicles, total));
    //}

}
