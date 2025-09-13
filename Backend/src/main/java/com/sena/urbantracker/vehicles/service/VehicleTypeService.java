package com.sena.urbantracker.vehicles.service;

import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleTypeDto;
import com.sena.urbantracker.vehicles.model.entity.VehicleType;
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
        if (vehicleTypeRepository.existsByName(dto.getName())) {
            throw new EntityAlreadyExistsException("Ya existe un tipo de vehículo con el nombre: " + dto.getName());
        }

        VehicleType entity = VehicleTypeMapper.toEntity(dto);
        entity.setActive(true);

        VehicleType saved = vehicleTypeRepository.save(entity);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(saved), "Tipo de vehículo creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleTypeDto>> findById(Long aLong) {
        VehicleType vehicleType = vehicleTypeRepository.findById(aLong)
                .orElseThrow(() -> new RuntimeException("Tipo de vehículo no encontrado por id."));

        return CrudResponseDto.success(Optional.of(VehicleTypeMapper.toDto(vehicleType)), "Tipo de vehículo encontrado");
    }

    @Override
    public CrudResponseDto<List<VehicleTypeDto>> findAll() {
        List<VehicleTypeDto> dtos = vehicleTypeRepository.findAll()
                .stream()
                .map(VehicleTypeMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de tipos de vehículos");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> update(VehicleTypeDto dto) {
        VehicleType vehicleType = vehicleTypeRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Tipo de vehículo no encontrado."));

        vehicleType.setName(dto.getName());
        vehicleType.setDescription(dto.getDescription());
        vehicleType.setActive(dto.getActive());

        VehicleType saved = vehicleTypeRepository.save(vehicleType);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(saved), "Tipo de vehículo actualizado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> deleteById(Long aLong) {
        if (!vehicleTypeRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Tipo de vehículo no encontrado con ese id.");
        }

        vehicleTypeRepository.deleteById(aLong);
        return CrudResponseDto.success(VehicleTypeMapper.toDto(null), "Tipo de vehículo eliminado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> activateById(Long aLong) {
        VehicleType vehicleType = vehicleTypeRepository.findById(aLong)
                .orElseThrow(() -> new RuntimeException("Ese tipo de vehículo no esta activo."));

        vehicleType.setActive(true);
        vehicleTypeRepository.save(vehicleType);

        return CrudResponseDto.success(VehicleTypeMapper.toDto(vehicleType), "Tipo de vehículo activado");
    }

    @Override
    public CrudResponseDto<VehicleTypeDto> deactivateById(Long aLong) {
        VehicleType vehicleType = vehicleTypeRepository.findById(aLong)
                .orElseThrow(() -> new RuntimeException("Tipo de vehículo no encontrado."));

        vehicleType.setActive(false);
        vehicleTypeRepository.save(vehicleType);

        return CrudResponseDto.success(VehicleTypeMapper.toDto(vehicleType), "Tipo de vehículo desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
       VehicleType vehicleType = vehicleTypeRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Ese tipo de vehículo no existe."));

        return CrudResponseDto.success(vehicleTypeRepository.existsById(aLong), "Tipo de vehículo encontrado");
    }

    private static class VehicleTypeMapper {

        public static VehicleTypeDto toDto(VehicleType entity) {
            VehicleTypeDto dto = new VehicleTypeDto();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setActive(entity.getActive());
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
