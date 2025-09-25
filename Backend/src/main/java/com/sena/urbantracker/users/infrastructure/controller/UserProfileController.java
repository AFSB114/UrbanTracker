package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.request.UserProfileReqDto;
import com.sena.urbantracker.users.application.dto.response.UserProfileResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user-profile")
public class UserProfileController extends BaseController<UserProfileReqDto, UserProfileResDto, Long> {

    public UserProfileController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_PROFILE, UserProfileReqDto.class, UserProfileResDto.class);
    }

    protected Class<UserProfileResDto> getDtoClass() {
        return UserProfileResDto.class;
    }


}