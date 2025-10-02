package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteAssignmentReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteAssignmentResDto;
import com.sena.urbantracker.routes.application.service.RouteAssignmentService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RouteAssignmentResDto>>> findByVehicleId(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(routeAssignmentService.findByVehicleId(vehicleId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteAssignmentResDto>> create(@RequestBody RouteAssignmentReqDto dto) {
        CrudResponseDto<RouteAssignmentResDto> response = routeAssignmentService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<RouteAssignmentResDto>>> findById(@PathVariable Long id) {
        CrudResponseDto<Optional<RouteAssignmentResDto>> response = routeAssignmentService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RouteAssignmentResDto>>> findAll() {
        CrudResponseDto<List<RouteAssignmentResDto>> response = routeAssignmentService.findAll();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteAssignmentResDto>> update(@PathVariable Long id, @RequestBody RouteAssignmentReqDto dto) {
        CrudResponseDto<RouteAssignmentResDto> response = routeAssignmentService.update(dto, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteAssignmentResDto>> delete(@PathVariable Long id) {
        CrudResponseDto<RouteAssignmentResDto> response = routeAssignmentService.deleteById(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteAssignmentResDto>> activate(@PathVariable Long id) {
        CrudResponseDto<RouteAssignmentResDto> response = routeAssignmentService.activateById(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<RouteAssignmentResDto>> deactivate(@PathVariable Long id) {
        CrudResponseDto<RouteAssignmentResDto> response = routeAssignmentService.deactivateById(id);
        return ResponseEntity.ok(response);
    }
}