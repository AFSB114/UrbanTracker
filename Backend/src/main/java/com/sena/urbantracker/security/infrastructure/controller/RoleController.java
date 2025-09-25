package com.sena.urbantracker.security.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.security.application.dto.request.RoleReqDto;
import com.sena.urbantracker.security.application.dto.response.RoleResDto;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/security/role")
public class RoleController extends BaseController<RoleReqDto, RoleResDto, Long> {

    public RoleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROLE, RoleReqDto.class, RoleResDto.class);
    }

}