package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDtoA;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssigments;
import com.sena.urbantracker.vehicles.domain.repository.IVehicleAssigments;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleAssigmentService implements CrudOperations<VehicleAssigmentResDtoA, VehicleAssigmentResDtoA, Long> {

    private final IVehicleAssigments vehicleAssigmentRepository;

    @Override
    public CrudResponseDto<VehicleAssigmentResDtoA> create(VehicleAssigmentResDtoA dto) {
        VehicleAssigments entity = VehicleAssigmentMapper.toEntity(dto);

        VehicleAssigments saved = vehicleAssigmentRepository.save(entity);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(saved), "Asignación de vehículo creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleAssigmentResDtoA>> findById(Long id) {
        VehicleAssigments vehicleAssigment = vehicleAssigmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de vehículo con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(VehicleAssigmentMapper.toDto(vehicleAssigment)), "Asignación de vehículo encontrada");
    }

    @Override
    public CrudResponseDto<List<VehicleAssigmentResDtoA>> findAll() {
        List<VehicleAssigmentResDtoA> dtos = vehicleAssigmentRepository.findAll()
                .stream()
                .map(VehicleAssigmentMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de asignaciones de vehículo");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDtoA> update(VehicleAssigmentResDtoA dto, Long id) {
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
    public CrudResponseDto<VehicleAssigmentResDtoA> deleteById(Long id) {
        if (!vehicleAssigmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Asignación de vehículo no encontrada.");
        }

        vehicleAssigmentRepository.deleteById(id);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(null), "Asignación de vehículo eliminada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDtoA> activateById(Long id) {
        // No aplica para asignaciones
        return CrudResponseDto.success(null, "Operación no soportada");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDtoA> deactivateById(Long id) {
        // No aplica para asignaciones
        return CrudResponseDto.success(null, "Operación no soportada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        return CrudResponseDto.success(vehicleAssigmentRepository.existsById(aLong), "Asignación de vehículo encontrada");
    }

    private static class VehicleAssigmentMapper {
        public static VehicleAssigmentResDtoA toDto(VehicleAssigments entity) {
            VehicleAssigmentResDtoA dto = new VehicleAssigmentResDtoA();
            dto.setId(entity.getId());
            dto.setVehicle(entity.getVehicle());
            dto.setDriver(entity.getDriver());
            dto.setNote(entity.getNote());
            dto.setAssignmentStatus(entity.getAssignmentStatus());
            dto.setActive(true); // Asumimos activo
            return dto;
        }

        public static VehicleAssigments toEntity(VehicleAssigmentResDtoA dto) {
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