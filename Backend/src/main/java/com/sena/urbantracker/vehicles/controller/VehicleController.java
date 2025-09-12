package com.sena.urbantracker.vehicles.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/vehicle")
public class VehicleController extends BaseController<VehicleDto, Long> {

    public VehicleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE);
    }

    @Override
    protected EntityType getEntityType() {
        return EntityType.VEHICLE;
    }

    @Override
    protected Class<VehicleDto> getDtoClass() {
        return VehicleDto.class;
    }

    @Override
    protected CrudOperations<VehicleDto, Long> getService() {
        return serviceFactory.getService(EntityType.VEHICLE, VehicleDto.class);
    }


}
