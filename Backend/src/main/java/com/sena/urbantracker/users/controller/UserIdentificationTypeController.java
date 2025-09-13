package com.sena.urbantracker.users.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.users.model.dto.response.UserIdentificationDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/user-identifications")
public class UserIdentificationTypeController extends BaseController<UserIdentificationDto, Long> {

    public UserIdentificationTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_IDENTIFICATION);
    }

    @Override
    protected EntityType getEntityType() {
        return EntityType.USER_IDENTIFICATION;
    }

    @Override
    protected Class<UserIdentificationDto> getDtoClass() {
        return UserIdentificationDto.class;
    }

    @Override
    protected CrudOperations<UserIdentificationDto, Long> getService() {
        return serviceFactory.getService(EntityType.USER_IDENTIFICATION, UserIdentificationDto.class);
    }
}
