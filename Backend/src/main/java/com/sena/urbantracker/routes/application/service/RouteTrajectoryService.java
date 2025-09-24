package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteTrajectoryReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteTrajectoryResDto;
import com.sena.urbantracker.routes.application.mapper.RouteTrajectoryMapper;
import com.sena.urbantracker.routes.domain.entity.RouteTrajectoryDomain;
import com.sena.urbantracker.routes.domain.repository.RouteTrajectoryRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteTrajectoryService implements CrudOperations<RouteTrajectoryReqDto, RouteTrajectoryResDto, Long> {

    private final RouteTrajectoryRepository routeTrajectoryRepository;

    @Override
    public CrudResponseDto<RouteTrajectoryResDto> create(RouteTrajectoryReqDto request) {
        RouteTrajectoryDomain entity = RouteTrajectoryMapper.toEntity(request);
        RouteTrajectoryDomain saved = routeTrajectoryRepository.save(entity);
        return CrudResponseDto.success(RouteTrajectoryMapper.toDto(saved), "Trayectoria de ruta creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteTrajectoryResDto>> findById(Long id) {
        RouteTrajectoryDomain routeTrajectory = routeTrajectoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trayectoria de ruta con id " + id + " no encontrada."));
        return CrudResponseDto.success(Optional.of(RouteTrajectoryMapper.toDto(routeTrajectory)), "Trayectoria de ruta encontrada");
    }

    @Override
    public CrudResponseDto<List<RouteTrajectoryResDto>> findAll() {
        List<RouteTrajectoryResDto> dtos = routeTrajectoryRepository.findAll()
                .stream()
                .map(RouteTrajectoryMapper::toDto)
                .toList();
        return CrudResponseDto.success(dtos, "Listado de trayectorias de ruta");
    }

    @Override
    public CrudResponseDto<RouteTrajectoryResDto> update(RouteTrajectoryReqDto request, Long id) {
        RouteTrajectoryDomain routeTrajectory = routeTrajectoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Trayectoria de ruta no encontrada."));
        routeTrajectory.setStartTime(request.getStartTime());
        routeTrajectory.setEndTime(request.getEndTime());
        routeTrajectory.setTrajectoryStatus(request.getTrajectoryStatus());
        RouteTrajectoryDomain updated = routeTrajectoryRepository.save(routeTrajectory);
        return CrudResponseDto.success(RouteTrajectoryMapper.toDto(updated), "Trayectoria de ruta actualizada correctamente");
    }

    @Override
    public CrudResponseDto<RouteTrajectoryResDto> deleteById(Long id) {
        if (!routeTrajectoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Trayectoria de ruta no encontrada.");
        }
        routeTrajectoryRepository.deleteById(id);
        return CrudResponseDto.success(RouteTrajectoryMapper.toDto(null), "Trayectoria de ruta eliminada correctamente");
    }

    @Override
    public CrudResponseDto<RouteTrajectoryResDto> activateById(Long id) {
        RouteTrajectoryDomain routeTrajectory = routeTrajectoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trayectoria de ruta no encontrada."));
        routeTrajectory.setActive(true);
        routeTrajectoryRepository.save(routeTrajectory);
        return CrudResponseDto.success(RouteTrajectoryMapper.toDto(routeTrajectory), "Trayectoria de ruta activada");
    }

    @Override
    public CrudResponseDto<RouteTrajectoryResDto> deactivateById(Long id) {
        RouteTrajectoryDomain routeTrajectory = routeTrajectoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trayectoria de ruta no encontrada."));
        routeTrajectory.setActive(false);
        routeTrajectoryRepository.save(routeTrajectory);
        return CrudResponseDto.success(RouteTrajectoryMapper.toDto(routeTrajectory), "Trayectoria de ruta desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeTrajectoryRepository.existsById(id), "Verificación de existencia completada");
    }
}