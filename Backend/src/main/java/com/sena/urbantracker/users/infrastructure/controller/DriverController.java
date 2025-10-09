package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.users.application.dto.request.DriverAssignedVehicleRouteReqDto;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverAssignedVehicleRouteResDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.users.application.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/driver")
public class DriverController extends BaseController<DriverReqDto, DriverResDto, Long> {

    private final DriverService driverService;

    public DriverController(ServiceFactory serviceFactory, DriverService driverService) {
        super(serviceFactory, EntityType.DRIVER, DriverReqDto.class, DriverResDto.class);
        this.driverService = driverService;
    }

    @PostMapping("/assigned-vehicle-route")
    public ResponseEntity<CrudResponseDto<DriverAssignedVehicleRouteResDto>> getAssignedVehicleAndRoute(@Valid @RequestBody DriverAssignedVehicleRouteReqDto request) {
        CrudResponseDto<DriverAssignedVehicleRouteResDto> response = driverService.getAssignedVehicleAndRoute(request);
        return ResponseEntity.ok(response);
    }

}