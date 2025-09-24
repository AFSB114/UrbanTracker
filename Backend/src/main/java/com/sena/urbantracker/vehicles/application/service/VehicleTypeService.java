package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.vehicles.application.dto.request.VehicleTypeReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleTypeResDto;
import com.sena.urbantracker.vehicles.application.mapper.VehicleTypeMapper;
import com.sena.urbantracker.vehicles.domain.entity.VehicleTypeDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleTypeRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleTypeService implements CrudOperations<VehicleTypeReqDto, VehicleTypeResDto, Long> {

    private final VehicleTypeRepository vehicleTypeRepository;

    @Override
    public CrudResponseDto<VehicleTypeResDto> create(VehicleTypeReqDto request) {
        if (vehicleTypeRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException("Ya existe un tipo de vehículo con nombre: " + request.getName());
        }

        VehicleTypeDomain entity = VehicleTypeMapper.toEntity(request);
        VehicleTypeDomain saved = vehicleTypeRepository.save(entity);

        return CrudResponseDto.success(VehicleTypeMapper.toDto(saved), "Tipo de vehículo creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleTypeResDto>> findById(Long id) {
        VehicleTypeDomain vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(VehicleTypeMapper.toDto(vehicleType)), "Tipo de vehículo encontrado");
    }

    @Override
    public CrudResponseDto<List<VehicleTypeResDto>> findAll() {
        List<VehicleTypeResDto> dtos = vehicleTypeRepository.findAll()
                .stream()
                .map(VehicleTypeMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de tipos de vehículo");
    }

    @Override
    public CrudResponseDto<VehicleTypeResDto> update(VehicleTypeReqDto request, Long id) {
        VehicleTypeDomain vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Tipo de vehículo no encontrado."));

        vehicleType.setName(request.getName());
        vehicleType.setDescription(request.getDescription());

        VehicleTypeDomain updated = vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(updated), "Tipo de vehículo actualizado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleTypeResDto> deleteById(Long id) {
        if (!vehicleTypeRepository.existsById(id)) {
            throw new EntityNotFoundException("Tipo de vehículo no encontrado.");
        }

        vehicleTypeRepository.deleteById(id);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(null), "Tipo de vehículo eliminado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleTypeResDto> activateById(Long id) {
        VehicleTypeDomain vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo no encontrado."));
        vehicleType.setActive(true);
        vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(vehicleType), "Tipo de vehículo activado");
    }

    @Override
    public CrudResponseDto<VehicleTypeResDto> deactivateById(Long id) {
        VehicleTypeDomain vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo no encontrado."));
        vehicleType.setActive(false);
        vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(vehicleType), "Tipo de vehículo desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(vehicleTypeRepository.existsById(id), "Verificación de existencia completada");
    }

}