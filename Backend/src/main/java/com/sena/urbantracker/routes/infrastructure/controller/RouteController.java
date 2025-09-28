package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDetailsResDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.application.service.RouteService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/route")
public class RouteController extends BaseController<RouteReqDto, RouteResDto, Long> {

    private final RouteService routeService;

    public RouteController(ServiceFactory serviceFactory, RouteService routeService) {
        super(serviceFactory, EntityType.ROUTE, RouteReqDto.class, RouteResDto.class);
        this.routeService = routeService;
    }

    @PostMapping("/with-images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteResDto>> create(@ModelAttribute RouteReqDto dto) throws BadRequestException {
        return super.create(dto);
    }

    @Override
    @PostMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteResDto>> update(@PathVariable Long id, @ModelAttribute RouteReqDto dto) throws BadRequestException {
        return super.update(id, dto);
    }


    @GetMapping("/{id}/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteDetailsResDto>> viewEdit(@PathVariable Long id, @PathVariable String type) throws BadRequestException {
        return ResponseEntity.ok(routeService.findByIdType(id, type));
    }
}

