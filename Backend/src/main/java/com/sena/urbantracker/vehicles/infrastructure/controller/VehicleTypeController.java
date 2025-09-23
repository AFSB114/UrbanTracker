package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleTypeDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vehicle-type")
public class VehicleTypeController extends BaseController<VehicleTypeDto, Long> {

    public VehicleTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE_TYPE);
    }

    @Override
    protected Class<VehicleTypeDto> getDtoClass() {
        return VehicleTypeDto.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleTypeDto>> create(@Valid @RequestBody VehicleTypeDto dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<VehicleTypeDto>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<VehicleTypeDto>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleTypeDto>> update(@PathVariable Long id, @Valid @RequestBody VehicleTypeDto dto) {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleTypeDto>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}