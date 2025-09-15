package com.sena.urbantracker.vehicles.service;

import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleAssigmentDto;
import com.sena.urbantracker.vehicles.model.entity.VehicleAssigments;
import com.sena.urbantracker.vehicles.model.enums.AssigmentStatusType;
import com.sena.urbantracker.vehicles.repository.IVehicleAssigments;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleAssigmentsService implements CrudOperations<VehicleAssigmentDto, Long> {

    private final IVehicleAssigments vehicleAssigmentsRepository;

    @Override
    public CrudResponseDto<VehicleAssigmentDto> create(VehicleAssigmentDto entity) {
        if(vehicleAssigmentsRepository.existsById(entity.getId())) {
            throw new EntityAlreadyExistsException("El vehículo ya tiene una asignación.");
        }
        VehicleAssigments vehicleAssigments = VehicleAssigmentMapper.toEntity(entity);
        vehicleAssigments.setAssignmentStatus(AssigmentStatusType.ACTIVE);

        VehicleAssigments saved = vehicleAssigmentsRepository.save(vehicleAssigments);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(saved), "Asignación guardada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleAssigmentDto>> findById(Long aLong) {
        VehicleAssigments vehicleAssigments = vehicleAssigmentsRepository.findById(aLong)
            .orElseThrow(() -> new EntityNotFoundException("Asignación no encontrada"));

        return CrudResponseDto.success(Optional.of(VehicleAssigmentMapper.toDto(vehicleAssigments)), "Asignación encontrada");
    }

    @Override
    public CrudResponseDto<List<VehicleAssigmentDto>> findAll() {
        List<VehicleAssigmentDto> dtos = vehicleAssigmentsRepository.findAll()
            .stream()
            .map(VehicleAssigmentMapper::toDto)
            .toList();

        return CrudResponseDto.success(dtos, "Listado de asignaciones");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> update(VehicleAssigmentDto dto) {
        VehicleAssigments vehicleAssigments = vehicleAssigmentsRepository.findById(dto.getId())
            .orElseThrow(() -> new EntityNotFoundException("Asignación no encontrada"));

        vehicleAssigments.setVehicle(dto.getVehicle());
        vehicleAssigments.setDriver(dto.getDriver());
        vehicleAssigments.setNote(dto.getNote());
        vehicleAssigments.setAssignmentStatus(dto.getAssignmentStatus());

        VehicleAssigments saved = vehicleAssigmentsRepository.save(vehicleAssigments);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(saved), "Asignación actualizada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> deleteById(Long aLong) {
        if (!vehicleAssigmentsRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Asignación no encontrada");
        }

        vehicleAssigmentsRepository.deleteById(aLong);
        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(null), "Asignación eliminada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> activateById(Long aLong) {
        VehicleAssigments vehicleAssigments = vehicleAssigmentsRepository.findById(aLong)
            .orElseThrow(() -> new EntityNotFoundException("Asignación no encontrada"));

        vehicleAssigments.setAssignmentStatus(AssigmentStatusType.ACTIVE);
        vehicleAssigmentsRepository.save(vehicleAssigments);

        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(vehicleAssigments), "Asignación activada correctamente");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentDto> deactivateById(Long aLong) {
        VehicleAssigments vehicleAssigments = vehicleAssigmentsRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Asignación no encontrada"));

        vehicleAssigments.setAssignmentStatus(AssigmentStatusType.INACTIVE);
        vehicleAssigmentsRepository.save(vehicleAssigments);

        return CrudResponseDto.success(VehicleAssigmentMapper.toDto(vehicleAssigments), "Asignación desactivada correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        VehicleAssigments vehicleAssigments = vehicleAssigmentsRepository.findById(aLong)
            .orElseThrow(() -> new EntityNotFoundException("Asignación no encontrada"));

        return CrudResponseDto.success(vehicleAssigmentsRepository.existsById(aLong), "Asignación encontrada");
    }

    private static class VehicleAssigmentMapper {

        public static VehicleAssigmentDto toDto(VehicleAssigments entity) {
            VehicleAssigmentDto dto = new VehicleAssigmentDto();
            dto.setId(entity.getId());
            dto.setVehicle(entity.getVehicle());
            dto.setDriver(entity.getDriver());
            dto.setNote(entity.getNote());
            dto.setAssignmentStatus(entity.getAssignmentStatus());
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
