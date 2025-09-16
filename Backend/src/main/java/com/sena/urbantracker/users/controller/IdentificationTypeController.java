package com.sena.urbantracker.users.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.users.model.dto.response.IdentificationTypeDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/identification-types")
public class IdentificationTypeController extends BaseController<IdentificationTypeDto, Long> {

    public IdentificationTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.IDENTIFICATION_TYPE);
    }
    protected EntityType getEntityType() {
        return EntityType.IDENTIFICATION_TYPE;
    }

    @Override
    protected Class<IdentificationTypeDto> getDtoClass() {
        return IdentificationTypeDto.class;
    }

    @Override
    protected CrudOperations<IdentificationTypeDto, Long> getService() {
        return serviceFactory.getService(EntityType.IDENTIFICATION_TYPE, IdentificationTypeDto.class);
    }
}
