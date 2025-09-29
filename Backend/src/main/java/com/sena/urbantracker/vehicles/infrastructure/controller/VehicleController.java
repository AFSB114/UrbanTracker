package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleResDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/vehicle")
@PreAuthorize("hasRole('ADMIN')")
public class VehicleController extends BaseController<VehicleReqDto, VehicleResDto, Long> {

    public VehicleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE, VehicleReqDto.class, VehicleResDto.class);
    }

}
