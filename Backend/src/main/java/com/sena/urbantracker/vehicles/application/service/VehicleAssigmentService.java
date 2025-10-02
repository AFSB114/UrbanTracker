package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.vehicles.application.dto.request.VehicleAssignmentReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDto;
import com.sena.urbantracker.vehicles.application.mapper.VehicleAssignmentMapper;
import com.sena.urbantracker.vehicles.domain.entity.VehicleAssignmentDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleAssignmentRepository;
import com.sena.urbantracker.vehicles.domain.repository.VehicleRepository;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import com.sena.urbantracker.users.domain.repository.DriverRepository;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
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
    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;
    private final UserProfileRepository userProfileRepository;

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> create(VehicleAssignmentReqDto request) {
        var vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado"));
        var driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new EntityNotFoundException("Conductor no encontrado"));
        var profile = userProfileRepository.findByUserId(driver.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
        driver.setProfile(profile);

        VehicleAssignmentDomain entity = VehicleAssignmentDomain.builder()
                .vehicle(vehicle)
                .driver(driver)
                .assignmentStatus(request.getAssignmentStatus())
                .note(request.getNote())
                .active(true)
                .build();

        VehicleAssignmentDomain saved = vehicleAssignmentRepository.save(entity);

        return CrudResponseDto.success(VehicleAssignmentMapper.toDto(saved), "Asignación de vehículo creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleAssigmentResDto>> findById(Long id) {
        VehicleAssignmentDomain vehicleAssignment = vehicleAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de vehículo con id " + id + " no encontrada."));

        var profile = userProfileRepository.findByUserId(vehicleAssignment.getDriver().getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
        vehicleAssignment.getDriver().setProfile(profile);

        return CrudResponseDto.success(Optional.of(VehicleAssignmentMapper.toDto(vehicleAssignment)), "Asignación de vehículo encontrada");
    }

    @Override
    public CrudResponseDto<List<VehicleAssigmentResDto>> findAll() {
        List<VehicleAssigmentResDto> dtos = vehicleAssignmentRepository.findAll()
                .stream()
                .peek(vehicleAssignment -> {
                    try {
                        var profile = userProfileRepository.findByUserId(vehicleAssignment.getDriver().getUser().getId())
                                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
                        vehicleAssignment.getDriver().setProfile(profile);
                    } catch (EntityNotFoundException e) {
                        // Handle or log the exception
                    }
                })
                .map(VehicleAssignmentMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de asignaciones de vehículo");
    }

    @Override
    public CrudResponseDto<VehicleAssigmentResDto> update(VehicleAssignmentReqDto request, Long id) {
        VehicleAssignmentDomain vehicleAssignment = vehicleAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Asignación de vehículo no encontrada."));

        var vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado"));
        var driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new EntityNotFoundException("Conductor no encontrado"));
        var profile = userProfileRepository.findByUserId(driver.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
        driver.setProfile(profile);

        vehicleAssignment.setVehicle(vehicle);
        vehicleAssignment.setDriver(driver);
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

    public CrudResponseDto<VehicleAssigmentResDto> findActiveByUserId(Long userId) {
        var assignment = vehicleAssignmentRepository.findActiveByUserId(userId, AssigmentStatusType.ACTIVE);
        if (assignment.isEmpty()) {
            return CrudResponseDto.success(null, "No se encontró asignación activa para el usuario");
        }

        var domain = assignment.get();
        var profile = userProfileRepository.findByUserId(domain.getDriver().getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
        domain.getDriver().setProfile(profile);

        return CrudResponseDto.success(VehicleAssignmentMapper.toDto(domain), "Asignación activa encontrada");
    }

    public CrudResponseDto<List<VehicleAssigmentResDto>> findByRouteId(Long routeId) {
        List<VehicleAssigmentResDto> dtos = vehicleAssignmentRepository.findByRouteId(routeId)
                .stream()
                .peek(vehicleAssignment -> {
                    try {
                        var profile = userProfileRepository.findByUserId(vehicleAssignment.getDriver().getUser().getId())
                                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
                        vehicleAssignment.getDriver().setProfile(profile);
                    } catch (EntityNotFoundException e) {
                        // Handle or log the exception
                    }
                })
                .map(VehicleAssignmentMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Asignaciones encontradas por ruta");
    }

    public CrudResponseDto<List<VehicleAssigmentResDto>> findByVehicleId(Long vehicleId) {
        List<VehicleAssigmentResDto> dtos = vehicleAssignmentRepository.findByVehicleId(vehicleId)
                .stream()
                .peek(vehicleAssignment -> {
                    try {
                        var profile = userProfileRepository.findByUserId(vehicleAssignment.getDriver().getUser().getId())
                                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
                        vehicleAssignment.getDriver().setProfile(profile);
                    } catch (EntityNotFoundException e) {
                        // Handle or log the exception
                    }
                })
                .map(VehicleAssignmentMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Asignaciones encontradas por vehículo");
    }

}