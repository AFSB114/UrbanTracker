package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.model.dto.request.RouteWaypointForRouteReqDto;
import com.sena.urbantracker.routes.model.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.model.dto.response.RouteDto;
import com.sena.urbantracker.routes.model.dto.response.RouteWaypointDto;
import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.repository.IRoute;
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
public class RouteService implements CrudOperations<RouteDto, Long> {

    private final IRoute routeRepository;
    private final RouteWaypointService routeWaypointService;

    public void addRoute(RouteWithWaypointsReqDto dto) {
        Integer numberRouteInt = Integer.valueOf(dto.getNumberRoute());
        if (routeRepository.existsByNumberRoute(numberRouteInt))
            throw new EntityAlreadyExistsException("Ya existe una ruta con número: " + dto.getNumberRoute());

        Route route = RouteMapper.toEntity(dto);
        routeRepository.save(route);
        System.out.println("Ruta creada");
        for (RouteWaypointForRouteReqDto waypointDto : dto.getWaypoints()) {
            routeWaypointService.create(routeWaypointService.toDtoNew(waypointDto, route));
        }
    }

    @Override
    public CrudResponseDto<RouteDto> create(RouteDto dto) {
        Integer numberRouteInt = Integer.valueOf(dto.getNumberRoute());
        if (routeRepository.existsByNumberRoute(numberRouteInt)) {
            throw new EntityAlreadyExistsException("Ya existe una ruta con número: " + dto.getNumberRoute());
        }

        Route entity = RouteMapper.toEntity(dto);
        Route saved = routeRepository.save(entity);
        return CrudResponseDto.success(RouteMapper.toDto(saved), "Ruta creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteDto>> findById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(RouteMapper.toDto(route)), "Ruta encontrada");
    }

    @Override
    public CrudResponseDto<List<RouteDto>> findAll() {
        List<RouteDto> dtos = routeRepository.findAll()
                .stream()
                .map(RouteMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de rutas");
    }

    @Override
    public CrudResponseDto<RouteDto> update(RouteDto dto) {
        Route route = routeRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Ruta no encontrada."));

        route.setNumberRoute(Integer.valueOf(dto.getNumberRoute()));
        route.setDescription(dto.getDescription());
        route.setTotalDistance(dto.getTotalDistance());

        Route updated = routeRepository.save(route);
        return CrudResponseDto.success(RouteMapper.toDto(updated), "Ruta actualizada correctamente");
    }

    @Override
    public CrudResponseDto<RouteDto> deleteById(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new EntityNotFoundException("Ruta no encontrada.");
        }

        routeRepository.deleteById(id);
        return CrudResponseDto.success(RouteMapper.toDto(null), "Ruta eliminada correctamente");
    }

    @Override
    public CrudResponseDto<RouteDto> activateById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));
        route.setActive(true);
        routeRepository.save(route);
        return CrudResponseDto.success(RouteMapper.toDto(route), "Ruta activada");
    }

    @Override
    public CrudResponseDto<RouteDto> deactivateById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));
        route.setActive(false);
        routeRepository.save(route);
        return CrudResponseDto.success(RouteMapper.toDto(route), "Ruta desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeRepository.existsById(id), "Verificación de existencia completada");
    }

    private static class RouteMapper {
        public static RouteDto toDto(Route entity) {
            if (entity == null) return null;
            RouteDto dto = new RouteDto();
            dto.setId(entity.getId());
            dto.setNumberRoute(entity.getNumberRoute().toString());
            dto.setDescription(entity.getDescription());
            dto.setTotalDistance(entity.getTotalDistance());
            return dto;
        }

        public static Route toEntity(RouteDto dto) {
            Route entity = new Route();
            entity.setId(dto.getId());
            entity.setNumberRoute(Integer.valueOf(dto.getNumberRoute()));
            entity.setDescription(dto.getDescription());
            entity.setTotalDistance(dto.getTotalDistance());
            entity.setActive(dto.getActive());
            entity.setCreatedAt(dto.getCreatedAt());
            entity.setUpdatedAt(dto.getUpdatedAt());
            return entity;
        }

        public static Route toEntity(RouteWithWaypointsReqDto dto) {
            return Route.builder()
                    .numberRoute(Integer.valueOf(dto.getNumberRoute()))
                    .description(dto.getDescription())
                    .totalDistance(dto.getTotalDistance())
                    .build();
        }
    }
}
