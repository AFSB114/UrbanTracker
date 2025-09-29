package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteWaypointResDto;
import com.sena.urbantracker.routes.application.mapper.RouteWaypointMapper;
import com.sena.urbantracker.routes.domain.repository.RouteRepository;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.domain.repository.RouteWaypointRepository;
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
public class RouteWaypointService implements CrudOperations<RouteWaypointReqDto, RouteWaypointResDto, Long> {

    private final RouteRepository routeRepository;
    private final RouteWaypointRepository routeWaypointRepository;

    @Override
    public CrudResponseDto<RouteWaypointResDto> create(RouteWaypointReqDto dto) {
        RouteDomain route = routeRepository.findById(dto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        if (routeWaypointRepository.existsByRouteAndSequence(route, dto.getSequence())) {
            throw new EntityAlreadyExistsException("Ya existe un punto de ruta con secuencia: " + dto.getSequence() + " para la ruta: " + route.getId());
        }

        RouteWaypointDomain entity = RouteWaypointMapper.toEntity(dto, route.getId());
        RouteWaypointDomain saved = routeWaypointRepository.save(entity);

        return CrudResponseDto.success(RouteWaypointMapper.toDto(saved), "Punto de ruta creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteWaypointResDto>> findById(Long id) {
        RouteWaypointDomain waypoint = routeWaypointRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Punto de ruta con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(RouteWaypointMapper.toDto(waypoint)), "Punto de ruta encontrado");
    }

    @Override
    public CrudResponseDto<List<RouteWaypointResDto>> findAll() {
        List<RouteWaypointResDto> dtos = routeWaypointRepository.findAll()
                .stream()
                .map(RouteWaypointMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de puntos de ruta");
    }

    @Override
    public CrudResponseDto<RouteWaypointResDto> update(RouteWaypointReqDto dto, Long id) {
        RouteWaypointDomain waypoint = routeWaypointRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Punto de ruta no encontrado."));

        RouteDomain route = routeRepository.findById(dto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        waypoint.setRoute(route);
        waypoint.setSequence(dto.getSequence());
        waypoint.setLatitude(dto.getLatitude());
        waypoint.setLongitude(dto.getLongitude());

        RouteWaypointDomain updated = routeWaypointRepository.save(waypoint);
        return CrudResponseDto.success(RouteWaypointMapper.toDto(updated), "Punto de ruta actualizado correctamente");
    }

    @Override
    public CrudResponseDto<RouteWaypointResDto> deleteById(Long id) {
        if (!routeWaypointRepository.existsById(id)) {
            throw new EntityNotFoundException("Punto de ruta no encontrado.");
        }

        routeWaypointRepository.deleteById(id);
        return CrudResponseDto.success(RouteWaypointMapper.toDto(null), "Punto de ruta eliminado correctamente");
    }

    @Override
    public CrudResponseDto<RouteWaypointResDto> activateById(Long id) {
        throw new UnsupportedOperationException("RouteWaypoint does not support activation/deactivation");
    }

    @Override
    public CrudResponseDto<RouteWaypointResDto> deactivateById(Long id) {
        throw new UnsupportedOperationException("RouteWaypoint does not support activation/deactivation");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeWaypointRepository.existsById(id), "Verificación de existencia completada");
    }

    public CrudResponseDto<List<RouteWaypointReqDto>> findByRouteId(Long routeId) {
        return null;
    }
}
