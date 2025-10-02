package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteAssignmentReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteAssignmentResDto;
import com.sena.urbantracker.routes.application.mapper.RouteAssignmentMapper;
import com.sena.urbantracker.routes.domain.entity.RouteAssignmentDomain;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.RouteAssignmentRepository;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteAssignmentService implements CrudOperations<RouteAssignmentReqDto, RouteAssignmentResDto, Long> {

    private final RouteAssignmentRepository routeAssignmentRepository;

    @Transactional
    @Override
    public CrudResponseDto<RouteAssignmentResDto> create(RouteAssignmentReqDto request) {
        // Verificar si ya existe una asignación para esta ruta y vehículo
        Optional<RouteAssignmentDomain> existing = routeAssignmentRepository.findByRouteIdAndVehicleId(request.getRouteId(), request.getVehicleId());
        if (existing.isPresent()) {
            throw new EntityAlreadyExistsException("Ya existe una asignación para esta ruta y vehículo");
        }

        RouteAssignmentDomain entity = RouteAssignmentMapper.toEntity(request);
        RouteAssignmentDomain saved = routeAssignmentRepository.save(entity);
        return CrudResponseDto.success(RouteAssignmentMapper.toDto(saved), "Asignación de ruta creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteAssignmentResDto>> findById(Long id) {
        RouteAssignmentDomain entity = routeAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de ruta con id " + id + " no encontrada"));
        return CrudResponseDto.success(Optional.of(RouteAssignmentMapper.toDto(entity)), "Asignación encontrada");
    }

    @Override
    public CrudResponseDto<List<RouteAssignmentResDto>> findAll() {
        List<RouteAssignmentDomain> entities = routeAssignmentRepository.findAll();
        List<RouteAssignmentResDto> dtos = entities.stream()
                .map(RouteAssignmentMapper::toDto)
                .toList();
        return CrudResponseDto.success(dtos, "Listado de asignaciones de rutas");
    }

    @Transactional
    @Override
    public CrudResponseDto<RouteAssignmentResDto> update(RouteAssignmentReqDto request, Long id) {
        RouteAssignmentDomain entity = routeAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de ruta no encontrada"));

        // Verificar si otra asignación ya tiene esta combinación (excluyendo la actual)
        Optional<RouteAssignmentDomain> existing = routeAssignmentRepository.findByRouteIdAndVehicleId(request.getRouteId(), request.getVehicleId());
        if (existing.isPresent() && !existing.get().getId().equals(id)) {
            throw new EntityAlreadyExistsException("Ya existe otra asignación para esta ruta y vehículo");
        }

        entity.setRoute(RouteDomain.builder().id(request.getRouteId()).build());
        entity.setVehicle(VehicleDomain.builder().id(request.getVehicleId()).build());
        entity.setAssignmentStatus(request.getAssignmentStatus());
        entity.setNote(request.getNote());

        RouteAssignmentDomain updated = routeAssignmentRepository.save(entity);
        return CrudResponseDto.success(RouteAssignmentMapper.toDto(updated), "Asignación de ruta actualizada correctamente");
    }

    @Override
    public CrudResponseDto<RouteAssignmentResDto> deleteById(Long id) {
        RouteAssignmentDomain entity = routeAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de ruta no encontrada"));
        routeAssignmentRepository.deleteById(id);
        return CrudResponseDto.success(RouteAssignmentMapper.toDto(entity), "Asignación de ruta eliminada correctamente");
    }

    @Override
    public CrudResponseDto<RouteAssignmentResDto> activateById(Long id) {
        RouteAssignmentDomain entity = routeAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de ruta no encontrada"));
        entity.setActive(true);
        routeAssignmentRepository.save(entity);
        return CrudResponseDto.success(RouteAssignmentMapper.toDto(entity), "Asignación de ruta activada");
    }

    @Override
    public CrudResponseDto<RouteAssignmentResDto> deactivateById(Long id) {
        RouteAssignmentDomain entity = routeAssignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asignación de ruta no encontrada"));
        entity.setActive(false);
        routeAssignmentRepository.save(entity);
        return CrudResponseDto.success(RouteAssignmentMapper.toDto(entity), "Asignación de ruta desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeAssignmentRepository.existsById(id), "Verificación de existencia completada");
    }

    public CrudResponseDto<List<RouteAssignmentResDto>> findByRouteId(Long routeId) {
        List<RouteAssignmentDomain> entities = routeAssignmentRepository.findByRouteId(routeId);
        List<RouteAssignmentResDto> dtos = entities.stream()
                .map(RouteAssignmentMapper::toDto)
                .toList();
        return CrudResponseDto.success(dtos, "Asignaciones para la ruta encontradas");
    }

    public CrudResponseDto<List<RouteAssignmentResDto>> findByVehicleId(Long vehicleId) {
        List<RouteAssignmentDomain> entities = routeAssignmentRepository.findByVehicleId(vehicleId);
        List<RouteAssignmentResDto> dtos = entities.stream()
                .map(RouteAssignmentMapper::toDto)
                .toList();
        return CrudResponseDto.success(dtos, "Asignaciones para el vehículo encontradas");
    }
}