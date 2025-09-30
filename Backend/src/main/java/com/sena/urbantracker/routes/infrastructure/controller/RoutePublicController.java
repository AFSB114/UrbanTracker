package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.response.RouteDetailsResDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.application.service.RouteService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/route")
@RequiredArgsConstructor
public class RoutePublicController {

    private final RouteService routeService;

    @GetMapping("/{id}/GEOMETRY")
    public ResponseEntity<CrudResponseDto<RouteDetailsResDto>> viewEdit(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(routeService.findByIdType(id, "GEOMETRY"));
    }

    @GetMapping
    public ResponseEntity<CrudResponseDto<List<RouteResDto>>> viewEdit() {
        return ResponseEntity.ok(routeService.findAll());
    }
}
