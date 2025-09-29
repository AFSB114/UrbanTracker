package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleTypeReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleTypeResDto;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vehicle-type")
public class VehicleTypeController extends BaseController<VehicleTypeReqDto, VehicleTypeResDto, Long> {

    public VehicleTypeController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.VEHICLE_TYPE, VehicleTypeReqDto.class, VehicleTypeResDto.class);
    }

    protected Class<VehicleTypeResDto> getDtoClass() {
        return VehicleTypeResDto.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleTypeResDto>> create(@Valid @RequestBody VehicleTypeReqDto dto) throws BadRequestException {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<VehicleTypeResDto>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<VehicleTypeResDto>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleTypeResDto>> update(@PathVariable Long id, @Valid @RequestBody VehicleTypeReqDto dto) throws BadRequestException {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<VehicleTypeResDto>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}