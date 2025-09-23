package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.UserIdentificationDto;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/user-identifications")
public class UserIdentificationController extends BaseController<UserIdentificationDto, Long> {

    public UserIdentificationController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_IDENTIFICATION);
    }

    @Override
    protected Class<UserIdentificationDto> getDtoClass() {
        return UserIdentificationDto.class;
    }
}