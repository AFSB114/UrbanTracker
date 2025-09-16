package com.sena.urbantracker.vehicles.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleTypeDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/vehicleType")
public class VehicleTypeController extends BaseController<VehicleTypeDto, Long> {

    public VehicleTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE_TYPE);
    }

    protected EntityType getEntityType() {
        return EntityType.VEHICLE_TYPE;
    }

    @Override
    protected Class<VehicleTypeDto> getDtoClass() {
        return VehicleTypeDto.class;
    }

    @Override
    protected CrudOperations<VehicleTypeDto, Long> getService() {
        return serviceFactory.getService(EntityType.VEHICLE_TYPE, VehicleTypeDto.class);
    }
}
