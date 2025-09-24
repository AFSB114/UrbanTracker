package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.UserIdentificationResDto;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/user-identification")
public class UserIdentificationController extends BaseController<UserIdentificationResDto, UserIdentificationResDto, Long> {

    public UserIdentificationController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_IDENTIFICATION, UserIdentificationResDto.class, UserIdentificationResDto.class);
    }


    protected Class<UserIdentificationResDto> getDtoClass() {
        return UserIdentificationResDto.class;
    }
}