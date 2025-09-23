package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleTypeDto;
import com.sena.urbantracker.vehicles.domain.entity.VehicleType;
import com.sena.urbantracker.vehicles.domain.repository.IVehicleType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleTypeService implements CrudOperations<VehicleTypeDto, VehicleTypeDto, Long> {

    private final IVehicleType vehicleTypeRepository;

    @Override
    public CrudResponseDto<VehicleTypeDto> create(VehicleTypeDto dto) {
        if (vehicleTypeRepository.existsByName(dto.getName())) {
            throw new EntityAlreadyExistsException("Ya existe un tipo de vehículo con nombre: " + dto.getName());
        }

        VehicleType entity = VehicleTypeMapper.toEntity(dto);

        VehicleType saved = vehicleTypeRepository.save(entity);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(saved), "Tipo de vehículo creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleTypeDto>> findById(Long id) {
        VehicleType vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(VehicleTypeMapper.toDto(vehicleType)), "Tipo de vehículo encontrado");
    }

    @Override
    public CrudResponseDto<List<VehicleTypeDto>> findAll() {
        List<VehicleTypeDto> dtos = vehicleTypeRepository.findAll()
                .stream()
                .map(VehicleTypeMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de tipos de vehículo");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> update(VehicleTypeDto dto, Long id) {
        VehicleType vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Tipo de vehículo no encontrado."));

        vehicleType.setName(dto.getName());
        vehicleType.setDescription(dto.getDescription());

        VehicleType updated = vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(updated), "Tipo de vehículo actualizado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> deleteById(Long id) {
        if (!vehicleTypeRepository.existsById(id)) {
            throw new EntityNotFoundException("Tipo de vehículo no encontrado.");
        }

        vehicleTypeRepository.deleteById(id);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(null), "Tipo de vehículo eliminado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> activateById(Long id) {
        VehicleType vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo no encontrado."));
        vehicleType.setActive(true);
        vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(vehicleType), "Tipo de vehículo activado");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> deactivateById(Long id) {
        VehicleType vehicleType = vehicleTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo no encontrado."));
        vehicleType.setActive(false);
        vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(vehicleType), "Tipo de vehículo desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        return CrudResponseDto.success(vehicleTypeRepository.existsById(aLong), "Tipo de vehículo encontrado");
    }

    private static class VehicleTypeMapper {
        public static VehicleTypeDto toDto(VehicleType entity) {
            VehicleTypeDto dto = new VehicleTypeDto();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setActive(entity.getActive());
            return dto;
        }

        public static VehicleType toEntity(VehicleTypeDto dto) {
            VehicleType entity = new VehicleType();
            entity.setId(dto.getId());
            entity.setName(dto.getName());
            entity.setDescription(dto.getDescription());
            entity.setActive(dto.getActive());
            return entity;
        }
    }
}