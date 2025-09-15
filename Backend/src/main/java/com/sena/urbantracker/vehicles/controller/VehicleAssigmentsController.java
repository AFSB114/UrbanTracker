package com.sena.urbantracker.vehicles.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleAssigmentDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/vehicleAssigments")
public class VehicleAssigmentsController extends BaseController<VehicleAssigmentDto, Long> {

    public VehicleAssigmentsController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE_ASSIGMENT);
    }

    @Override
    protected EntityType getEntityType() {
        return EntityType.VEHICLE_ASSIGMENT;
    }

    @Override
    protected Class<VehicleAssigmentDto> getDtoClass() {
        return VehicleAssigmentDto.class;
    }

    @Override
    protected CrudOperations<VehicleAssigmentDto, Long> getService() {
        return serviceFactory.getService(EntityType.VEHICLE_ASSIGMENT, VehicleAssigmentDto.class);
    }
}
