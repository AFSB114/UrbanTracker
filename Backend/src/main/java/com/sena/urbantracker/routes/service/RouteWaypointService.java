package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.model.dto.request.RouteWaypointForRouteReqDto;
import com.sena.urbantracker.routes.model.dto.response.RouteWaypointDto;
import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.model.entity.RouteWaypoint;
import com.sena.urbantracker.routes.repository.IRoute;
import com.sena.urbantracker.routes.repository.IRouteWaypoint;
import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteWaypointService implements CrudOperations<RouteWaypointDto, Long> {

    private final IRouteWaypoint routeWaypointRepository;
    private final IRoute routeRepository;

    public RouteWaypointDto toDtoNew(RouteWaypointForRouteReqDto dto, Route route) {
        return RouteWaypointDto.builder()
                .routeId(route.getId())
                .sequence(dto.getSequence())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .build();
    }

    @Override
    public CrudResponseDto<RouteWaypointDto> create(RouteWaypointDto dto) {
        Route route = routeRepository.findById(dto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        if (routeWaypointRepository.existsByRouteAndSequence(route, dto.getSequence())) {
            throw new EntityAlreadyExistsException("Ya existe un punto de ruta con secuencia: " + dto.getSequence() + " para la ruta: " + route.getId());
        }

        RouteWaypoint entity = RouteWaypointMapper.toEntity(dto, route);
        RouteWaypoint saved = routeWaypointRepository.save(entity);
        System.out.println("Punto de ruta creado");
        return CrudResponseDto.success(RouteWaypointMapper.toDto(saved), "Punto de ruta creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteWaypointDto>> findById(Long id) {
        RouteWaypoint waypoint = routeWaypointRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Punto de ruta con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(RouteWaypointMapper.toDto(waypoint)), "Punto de ruta encontrado");
    }

    @Override
    public CrudResponseDto<List<RouteWaypointDto>> findAll() {
        List<RouteWaypointDto> dtos = routeWaypointRepository.findAll()
                .stream()
                .map(RouteWaypointMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de puntos de ruta");
    }

    @Override
    public CrudResponseDto<RouteWaypointDto> update(RouteWaypointDto dto) {
        RouteWaypoint waypoint = routeWaypointRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Punto de ruta no encontrado."));

        Route route = routeRepository.findById(dto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        waypoint.setRoute(route);
        waypoint.setSequence(dto.getSequence());
        waypoint.setLatitude(dto.getLatitude());
        waypoint.setLongitude(dto.getLongitude());

        RouteWaypoint updated = routeWaypointRepository.save(waypoint);
        return CrudResponseDto.success(RouteWaypointMapper.toDto(updated), "Punto de ruta actualizado correctamente");
    }

    @Override
    public CrudResponseDto<RouteWaypointDto> deleteById(Long id) {
        if (!routeWaypointRepository.existsById(id)) {
            throw new EntityNotFoundException("Punto de ruta no encontrado.");
        }

        routeWaypointRepository.deleteById(id);
        return CrudResponseDto.success(RouteWaypointMapper.toDto(null), "Punto de ruta eliminado correctamente");
    }

//    @Override
//    public CrudResponseDto<RouteWaypointDto> activateById(Long id) {
//        RouteWaypoint waypoint = routeWaypointRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Punto de ruta no encontrado."));
//        waypoint.setActive(true);
//        routeWaypointRepository.save(waypoint);
//        return CrudResponseDto.success(RouteWaypointMapper.toDto(waypoint), "Punto de ruta activado");
//    }
//
//    @Override
//    public CrudResponseDto<RouteWaypointDto> deactivateById(Long id) {
//        RouteWaypoint waypoint = routeWaypointRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Punto de ruta no encontrado."));
//        waypoint.setActive(false);
//        routeWaypointRepository.save(waypoint);
//        return CrudResponseDto.success(RouteWaypointMapper.toDto(waypoint), "Punto de ruta desactivado");
//    }


    @Override
    public CrudResponseDto<RouteWaypointDto> activateById(Long id) {
        throw new UnsupportedOperationException("RouteWaypoint does not support activation/deactivation");
    }

    @Override
    public CrudResponseDto<RouteWaypointDto> deactivateById(Long id) {
        throw new UnsupportedOperationException("RouteWaypoint does not support activation/deactivation");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeWaypointRepository.existsById(id), "Verificación de existencia completada");
    }

    public CrudResponseDto<List<RouteWaypointDto>> findByRouteId(Long routeId) {
        List<RouteWaypoint> waypoints = routeWaypointRepository.findByRoute_Id(routeId);
        List<RouteWaypointDto> dtos = convertToDtoList(waypoints);
        return CrudResponseDto.success(dtos, "Puntos de ruta encontrados para la ruta: " + routeId);
    }

    public List<RouteWaypointDto> convertToDtoList(List<RouteWaypoint> entities) {
        return entities.stream()
                .map(RouteWaypointMapper::toDto)
                .toList();
    }

    public List<RouteWaypointDto> findByRoute(Long routeId) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        List<RouteWaypoint> entities = routeWaypointRepository.findByRoute_Id(routeId);
        return convertToDtoList(entities);
    }

    private static class RouteWaypointMapper {
        public static RouteWaypointDto toDto(RouteWaypoint entity) {
            if (entity == null) return null;
            RouteWaypointDto dto = new RouteWaypointDto();
            dto.setId(entity.getId());
            dto.setRouteId(entity.getRoute().getId());
            dto.setSequence(entity.getSequence());
            dto.setLatitude(entity.getLatitude());
            dto.setLongitude(entity.getLongitude());
            return dto;
        }

        public static RouteWaypoint toEntity(RouteWaypointDto dto, Route route) {
            RouteWaypoint entity = new RouteWaypoint();
            entity.setRoute(route);
            entity.setSequence(dto.getSequence());
            entity.setLatitude(dto.getLatitude());
            entity.setLongitude(dto.getLongitude());
            return entity;
        }
    }
}
