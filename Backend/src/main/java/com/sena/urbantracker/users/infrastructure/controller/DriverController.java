package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverAssignedVehicleRouteResDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.users.application.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/driver")
public class DriverController extends BaseController<DriverReqDto, DriverResDto, Long> {

    private final DriverService driverService;

    public DriverController(ServiceFactory serviceFactory, DriverService driverService) {
        super(serviceFactory, EntityType.DRIVER, DriverReqDto.class, DriverResDto.class);
        this.driverService = driverService;
    }

    @GetMapping("/assigned-vehicle-route/{userId}")
    public ResponseEntity<CrudResponseDto<DriverAssignedVehicleRouteResDto>> getAssignedVehicleAndRoute(@PathVariable Long userId) {
        CrudResponseDto<DriverAssignedVehicleRouteResDto> response = driverService.getAssignedVehicleAndRouteByUserId(userId);
        return ResponseEntity.ok(response);
    }

}