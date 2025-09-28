package com.sena.urbantracker.security.infrastructure.controller;

import com.sena.urbantracker.security.application.dto.request.UserReqDto;
import com.sena.urbantracker.security.application.dto.request.UserResDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/security/user")
public class UserController extends BaseController<UserReqDto, UserResDto, Long> {

    public UserController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER, UserReqDto.class, UserResDto.class);
    }
}