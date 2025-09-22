package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vehicle")
public class VehicleController extends BaseController<VehicleDto, Long> {

    public VehicleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE);
    }

    @Override
    protected Class<VehicleDto> getDtoClass() {
        return VehicleDto.class;
    }

}
