package com.sena.urbantracker.users.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.users.model.dto.response.DriverDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/driver")
public class DriverController extends BaseController<DriverDto, Long> {

    public DriverController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.DRIVER);
    }

    protected EntityType getEntityType() {
        return EntityType.DRIVER;
    }

    @Override
    protected Class<DriverDto> getDtoClass() {
        return DriverDto.class;
    }

    @Override
    protected CrudOperations<DriverDto, Long> getService() {
        return serviceFactory.getService(EntityType.DRIVER, DriverDto.class);
    }
}
