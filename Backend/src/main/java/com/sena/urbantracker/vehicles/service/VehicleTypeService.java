package com.sena.urbantracker.vehicles.service;

import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleTypeDto;
import com.sena.urbantracker.vehicles.repository.IVehicleType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleTypeService implements CrudOperations<VehicleTypeDto, Long> {

    private final IVehicleType vehicleTypeRepository;

    @Override
    public CrudResponseDto<VehicleTypeDto> create(VehicleTypeDto dto) {
        return null;
    }

    @Override
    public CrudResponseDto<Optional<VehicleTypeDto>> findById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<List<VehicleTypeDto>> findAll() {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> update(VehicleTypeDto dto) {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> deleteById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> activateById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> deactivateById(Long aLong) {
        return null;
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        return null;
    }
}
