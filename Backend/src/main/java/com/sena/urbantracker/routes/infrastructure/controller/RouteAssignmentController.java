package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteAssignmentReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteAssignmentResDto;
import com.sena.urbantracker.routes.application.service.RouteAssignmentService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.List;

@RestController
@RequestMapping("/api/v1/route-assignment")
public class RouteAssignmentController extends BaseController<RouteAssignmentReqDto, RouteAssignmentResDto, Long> {

    private final RouteAssignmentService routeAssignmentService;

    public RouteAssignmentController(ServiceFactory serviceFactory, RouteAssignmentService routeAssignmentService) {
        super(serviceFactory, EntityType.ROUTE_ASSIGNMENT, RouteAssignmentReqDto.class, RouteAssignmentResDto.class);
        this.routeAssignmentService = routeAssignmentService;
    }

    @GetMapping("/route/{routeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RouteAssignmentResDto>>> findByRouteId(@PathVariable Long routeId) {
        return ResponseEntity.ok(routeAssignmentService.findByRouteId(routeId));
    }

    @GetMapping("/vehicle/{vehicleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RouteAssignmentResDto>>> findByVehicleId(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(routeAssignmentService.findByVehicleId(vehicleId));
    }
}