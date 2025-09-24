package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.IdentificationTypeResDtoA;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/identification-types")
public class IdentificationTypeController extends BaseController<IdentificationTypeResDtoA, IdentificationTypeResDtoA, Long> {

    public IdentificationTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.IDENTIFICATION_TYPE, IdentificationTypeResDtoA.class, IdentificationTypeResDtoA.class);
    }

    protected Class<IdentificationTypeResDtoA> getDtoClass() {
        return IdentificationTypeResDtoA.class;
    }
}