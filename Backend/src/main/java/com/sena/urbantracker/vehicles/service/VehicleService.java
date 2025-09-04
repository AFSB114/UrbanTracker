package com.sena.urbantracker.vehicles.service;

import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.ActivableEntity;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleService implements CrudOperations<VehicleDto, Long>, ActivableEntity<VehicleDto> {


    @Override
    public CrudResponseDto<VehicleDto> activate() {
        return new CrudResponseDto<>();
    }

    @Override
    public CrudResponseDto<VehicleDto> deactivate() {
        return null;
    }

    @Override
    public CrudResponseDto<Boolean> isActive() {
        return null;
    }

    @Override
    public CrudResponseDto<Boolean> isNotActive() {
        return null;
    }

    @Override
    public CrudResponseDto<List<VehicleDto>> findAllActive() {
        return null;
    }

    @Override
    public CrudResponseDto<List<VehicleDto>> findAllInactive() {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleDto> create(VehicleDto entity) {
        return null;
    }

    @Override
    public CrudResponseDto<Optional<VehicleDto>> findById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<List<VehicleDto>> findAll() {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleDto> update(VehicleDto entity) {
        return null;
    }

    @Override
    public CrudResponseDto<Void> deleteById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleDto> activateById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleDto> deactivateById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        return null;
    }
}
