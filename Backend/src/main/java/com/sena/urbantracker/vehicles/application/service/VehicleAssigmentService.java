package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.vehicles.application.dto.request.VehicleAssignmentReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDto;
import com.sena.urbantracker.vehicles.application.mapper.VehicleAssignmentMapper;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleAssignmentRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleAssigmentService implements CrudOperations<VehicleAssignmentReqDto, VehicleAssigmentResDto, Long> {

    private final VehicleAssignmentRepository vehicleAssignmentRepository;

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> create(VehicleAssignmentReqDto request) {
        VehicleAssignmentDomain entity = VehicleAssignmentMapper.toEntity(request);
        VehicleAssignmentDomain saved = vehicleAssignmentRepository.save(entity);

        return CrudResponseDto.success(VehicleAssignmentMapper.toDto(saved), "Asignación de vehículo creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleAssigmentResDto>> findById(Long id) {
        VehicleAssignmentDomain vehicleAssignment = vehicleAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de vehículo con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(VehicleAssignmentMapper.toDto(vehicleAssignment)), "Asignación de vehículo encontrada");
    }

    @Override
    public CrudResponseDto<List<VehicleAssigmentResDto>> findAll() {
        List<VehicleAssigmentResDto> dtos = vehicleAssignmentRepository.findAll()
                .stream()
                .map(VehicleAssignmentMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de asignaciones de vehículo");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> update(VehicleAssignmentReqDto request, Long id) {
        VehicleAssignmentDomain vehicleAssignment = vehicleAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Asignación de vehículo no encontrada."));

        vehicleAssignment.setVehicleId(request.getVehicleId());
        vehicleAssignment.setDriverId(request.getDriverId());
        vehicleAssignment.setNote(request.getNote());
        vehicleAssignment.setAssignmentStatus(request.getAssignmentStatus());

        VehicleAssignmentDomain updated = vehicleAssignmentRepository.save(vehicleAssignment);
        return CrudResponseDto.success(VehicleAssignmentMapper.toDto(updated), "Asignación de vehículo actualizada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> deleteById(Long id) {
        if (!vehicleAssignmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Asignación de vehículo no encontrada.");
        }

        vehicleAssignmentRepository.deleteById(id);
        return CrudResponseDto.success(VehicleAssignmentMapper.toDto(null), "Asignación de vehículo eliminada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> activateById(Long id) {
        // No aplica para asignaciones
        return CrudResponseDto.success(null, "Operación no soportada");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> deactivateById(Long id) {
        // No aplica para asignaciones
        return CrudResponseDto.success(null, "Operación no soportada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(vehicleAssignmentRepository.existsById(id), "Verificación de existencia completada");
    }

}