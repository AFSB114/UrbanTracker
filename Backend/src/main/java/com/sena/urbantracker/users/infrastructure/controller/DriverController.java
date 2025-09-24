package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/drivers")
public class DriverController extends BaseController<DriverResDto, DriverResDto, Long> {

    public DriverController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.DRIVER, DriverResDto.class, DriverResDto.class);
    }

    protected Class<DriverResDto> getDtoClass() {
        return DriverResDto.class;
    }
}