package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.IdentificationTypeResDto;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/identification-type")
public class IdentificationTypeController extends BaseController<IdentificationTypeResDto, IdentificationTypeResDto, Long> {

    public IdentificationTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.IDENTIFICATION_TYPE, IdentificationTypeResDto.class, IdentificationTypeResDto.class);
    }

    protected Class<IdentificationTypeResDto> getDtoClass() {
        return IdentificationTypeResDto.class;
    }
}