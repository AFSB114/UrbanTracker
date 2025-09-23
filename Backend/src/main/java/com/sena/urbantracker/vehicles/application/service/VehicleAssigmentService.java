package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentDto;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssigments;
import com.sena.urbantracker.vehicles.domain.repository.IVehicleAssigments;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleAssigmentService implements CrudOperations<VehicleAssigmentDto, VehicleAssigmentDto, Long> {

    private final IVehicleAssigments vehicleAssigmentRepository;

    @Override
    public CrudResponseDto<VehicleAssigmentDto> create(VehicleAssigmentDto dto) {
        VehicleAssigments entity = VehicleAssigmentMapper.toEntity(dto);

        VehicleAssigments saved = vehicleAssigmentRepository.save(entity);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(saved), "Asignación de vehículo creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleAssigmentDto>> findById(Long id) {
        VehicleAssigments vehicleAssigment = vehicleAssigmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de vehículo con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(VehicleAssigmentMapper.toDto(vehicleAssigment)), "Asignación de vehículo encontrada");
    }

    @Override
    public CrudResponseDto<List<VehicleAssigmentDto>> findAll() {
        List<VehicleAssigmentDto> dtos = vehicleAssigmentRepository.findAll()
                .stream()
                .map(VehicleAssigmentMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de asignaciones de vehículo");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> update(VehicleAssigmentDto dto) {
        VehicleAssigments vehicleAssigment = vehicleAssigmentRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Asignación de vehículo no encontrada."));

        vehicleAssigment.setVehicle(dto.getVehicle());
        vehicleAssigment.setDriver(dto.getDriver());
        vehicleAssigment.setNote(dto.getNote());
        vehicleAssigment.setAssignmentStatus(dto.getAssignmentStatus());

        VehicleAssigments updated = vehicleAssigmentRepository.save(vehicleAssigment);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(updated), "Asignación de vehículo actualizada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> deleteById(Long id) {
        if (!vehicleAssigmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Asignación de vehículo no encontrada.");
        }

        vehicleAssigmentRepository.deleteById(id);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(null), "Asignación de vehículo eliminada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> activateById(Long id) {
        // No aplica para asignaciones
        return CrudResponseDto.success(null, "Operación no soportada");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> deactivateById(Long id) {
        // No aplica para asignaciones
        return CrudResponseDto.success(null, "Operación no soportada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        return CrudResponseDto.success(vehicleAssigmentRepository.existsById(aLong), "Asignación de vehículo encontrada");
    }

    private static class VehicleAssigmentMapper {
        public static VehicleAssigmentDto toDto(VehicleAssigments entity) {
            VehicleAssigmentDto dto = new VehicleAssigmentDto();
            dto.setId(entity.getId());
            dto.setVehicle(entity.getVehicle());
            dto.setDriver(entity.getDriver());
            dto.setNote(entity.getNote());
            dto.setAssignmentStatus(entity.getAssignmentStatus());
            dto.setActive(true); // Asumimos activo
            return dto;
        }

        public static VehicleAssigments toEntity(VehicleAssigmentDto dto) {
            VehicleAssigments entity = new VehicleAssigments();
            entity.setId(dto.getId());
            entity.setVehicle(dto.getVehicle());
            entity.setDriver(dto.getDriver());
            entity.setNote(dto.getNote());
            entity.setAssignmentStatus(dto.getAssignmentStatus());
            return entity;
        }
    }
}