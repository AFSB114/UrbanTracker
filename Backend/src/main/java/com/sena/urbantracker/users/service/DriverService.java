package com.sena.urbantracker.users.service;


import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.users.model.dto.response.DriverDto;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService implements CrudOperations<DriverDto, Long>, ActivableEntity<DriverDto> {


    @Override
    public CrudResponseDto<DriverDto> activate() {
        return null;
    }

    @Override
    public CrudResponseDto<DriverDto> deactivate() {
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
    public CrudResponseDto<List<DriverDto>> findAllActive() {
        return null;
    }

    @Override
    public CrudResponseDto<List<DriverDto>> findAllInactive() {
        return null;
    }

    @Override
    public CrudResponseDto<DriverDto> create(DriverDto entity) {
        return null;
    }

    @Override
    public CrudResponseDto<Optional<DriverDto>> findById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<List<DriverDto>> findAll() {
        return null;
    }

    @Override
    public CrudResponseDto<DriverDto> update(DriverDto entity) {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleDto> deleteById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<DriverDto> activateById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<DriverDto> deactivateById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        return null;
    }
}
