package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDtoA;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vehicle-assigment")
public class VehicleAssigmentController extends BaseController<VehicleAssigmentResDtoA, VehicleAssigmentResDtoA, Long> {

    public VehicleAssigmentController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE_ASSIGMENT, VehicleAssigmentResDtoA.class, VehicleAssigmentResDtoA.class);
    }

    protected Class<VehicleAssigmentResDtoA> getDtoClass() {
        return VehicleAssigmentResDtoA.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentResDtoA>> create(@Valid @RequestBody VehicleAssigmentResDtoA dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<VehicleAssigmentResDtoA>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<VehicleAssigmentResDtoA>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentResDtoA>> update(@PathVariable Long id, @Valid @RequestBody VehicleAssigmentResDtoA dto) {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleAssigmentResDtoA>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}