package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vehicle-assigment")
public class VehicleAssigmentController extends BaseController<VehicleAssigmentDto, VehicleAssigmentDto, Long> {

    public VehicleAssigmentController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE_ASSIGMENT, VehicleAssigmentDto.class, VehicleAssigmentDto.class);
    }

    protected Class<VehicleAssigmentDto> getDtoClass() {
        return VehicleAssigmentDto.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentDto>> create(@Valid @RequestBody VehicleAssigmentDto dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<VehicleAssigmentDto>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<VehicleAssigmentDto>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentDto>> update(@PathVariable Long id, @Valid @RequestBody VehicleAssigmentDto dto) {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentDto>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}