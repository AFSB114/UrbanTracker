package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.DriverResDtoA;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/drivers")
public class DriverController extends BaseController<DriverResDtoA, DriverResDtoA, Long> {

    public DriverController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.DRIVER, DriverResDtoA.class, DriverResDtoA.class);
    }

    protected Class<DriverResDtoA> getDtoClass() {
        return DriverResDtoA.class;
    }
}