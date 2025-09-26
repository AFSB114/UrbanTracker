package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/route")
public class RouteController extends BaseController<RouteReqDto, RouteResDto, Long> {

    public RouteController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROUTE, RouteReqDto.class, RouteResDto.class);
    }

    @PostMapping("/with-images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteResDto>> create(
            @ModelAttribute RouteReqDto dto) throws BadRequestException {
        return super.create(dto);
    }
}

