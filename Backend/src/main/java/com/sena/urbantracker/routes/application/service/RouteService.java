package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteWaypointForRouteReqDto;
import com.sena.urbantracker.routes.application.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDto;
import com.sena.urbantracker.routes.application.dto.response.RouteWaypointDto;
import com.sena.urbantracker.routes.application.mapper.RouteMapper;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.IRoute;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteService implements CrudOperations<RouteDto, Long> {

    private final IRoute routeRepository;
    @Lazy
    private final ServiceFactory serviceFactory;

    public RouteWaypointDto toDtoNew(RouteWaypointForRouteReqDto dto, RouteDomain route) {
        return RouteWaypointDto.builder()
                .routeId(route.getId())
                .sequence(dto.getSequence())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .type(dto.getType())
                .build();
    }

    public void addRoute(RouteWithWaypointsReqDto dto) {
        Integer numberRouteInt = Integer.valueOf(dto.getNumberRoute());
        if (routeRepository.existsByNumberRoute(numberRouteInt))
            throw new EntityAlreadyExistsException("Ya existe una ruta con número: " + dto.getNumberRoute());

        RouteDomain route = RouteMapper.toEntity(dto);
        routeRepository.save(route);
        System.out.println("Ruta creada");
        CrudOperations<RouteWaypointDto, Long> routeWaypointService = serviceFactory.createCrudService(EntityType.ROUTE_WAYPOINT);
        for (RouteWaypointForRouteReqDto waypointDto : dto.getWaypoints()) {
            RouteWaypointDto waypointDtoToCreate = toDtoNew(waypointDto, route);
            routeWaypointService.create(waypointDtoToCreate);
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

}
