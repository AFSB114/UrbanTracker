package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleAssignmentReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDto;
import com.sena.urbantracker.vehicles.application.service.VehicleAssigmentService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vehicle-assigment")
public class VehicleAssigmentController extends BaseController<VehicleAssignmentReqDto, VehicleAssigmentResDto, Long> {

    private final VehicleAssigmentService vehicleAssigmentService;

    public VehicleAssigmentController(ServiceFactory serviceFactory, VehicleAssigmentService vehicleAssigmentService) {
        super(serviceFactory, EntityType.VEHICLE_ASSIGMENT, VehicleAssignmentReqDto.class, VehicleAssigmentResDto.class);
        this.vehicleAssigmentService = vehicleAssigmentService;
    }

    protected Class<VehicleAssigmentResDto> getDtoClass() {
        return VehicleAssigmentResDto.class;
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<VehicleAssigmentResDto>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<VehicleAssigmentResDto>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentResDto>> update(@PathVariable Long id, @Valid @RequestBody VehicleAssignmentReqDto dto) throws BadRequestException {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentResDto>> delete(@PathVariable Long id) {
        return super.delete(id);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentResDto>> findActiveByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(vehicleAssigmentService.findActiveByUserId(userId));
    }
}