package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteWaypointResDto;
import com.sena.urbantracker.routes.application.mapper.RouteWaypointMapper;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.domain.repository.IRoute;
import com.sena.urbantracker.routes.domain.repository.IRouteWaypoint;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.application.service.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteWaypointService implements CrudOperations<RouteWaypointReqDto, RouteWaypointResDto, Long> {

    @Lazy
    private final ServiceFactory serviceFactory;
    @Lazy
    private final RepositoryFactory repositoryFactory;

    private IRouteWaypoint getRouteWaypointRepository() {
        return (IRouteWaypoint) repositoryFactory.createRepository(EntityType.ROUTE_WAYPOINT, RouteWaypointDomain.class);
    }

    private IRoute getRouteRepository() {
        return (IRoute) repositoryFactory.createRepository(EntityType.ROUTE, RouteDomain.class);
    }

    public RouteWaypointDto toDtoNew(RouteWaypointForRouteReqDto dto, RouteDomain route) {
        return RouteWaypointDto.builder()
                .routeId(route.getId())
                .sequence(dto.getSequence())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .type(dto.getType())
                .build();
    }

    @Override
    public CrudResponseDto<RouteWaypointResDto> create(RouteWaypointReqDto dto) {
        RouteDomain route = getRouteRepository().findById(dto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        if (getRouteWaypointRepository().existsByRouteAndSequence(route, dto.getSequence())) {
            throw new EntityAlreadyExistsException("Ya existe un punto de ruta con secuencia: " + dto.getSequence() + " para la ruta: " + route.getId());
        }

        RouteWaypointDomain entity = RouteWaypointMapper.toEntity(dto, route);
        RouteWaypointDomain saved = getRouteWaypointRepository().save(entity);
        System.out.println("Punto de ruta creado");
        return CrudResponseDto.success(RouteWaypointMapper.toDto(saved), "Punto de ruta creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteWaypointDto>> findById(Long id) {
        RouteWaypointDomain waypoint = getRouteWaypointRepository().findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Punto de ruta con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(RouteWaypointMapper.toDto(waypoint)), "Punto de ruta encontrado");
    }

    @Override
    public CrudResponseDto<List<RouteWaypointDto>> findAll() {
        List<RouteWaypointDto> dtos = getRouteWaypointRepository().findAll()
                .stream()
                .map(RouteWaypointMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de puntos de ruta");
    }

    @Override
    public CrudResponseDto<RouteWaypointDto> update(RouteWaypointReqDto dto) {
        RouteWaypointDomain waypoint = getRouteWaypointRepository().findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Punto de ruta no encontrado."));

        RouteDomain route = getRouteRepository().findById(dto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        waypoint.setRoute(route);
        waypoint.setSequence(dto.getSequence());
        waypoint.setLatitude(dto.getLatitude());
        waypoint.setLongitude(dto.getLongitude());

        RouteWaypointDomain updated = getRouteWaypointRepository().save(waypoint);
        return CrudResponseDto.success(RouteWaypointMapper.toDto(updated), "Punto de ruta actualizado correctamente");
    }

    @Override
    public CrudResponseDto<RouteWaypointDto> deleteById(Long id) {
        if (!getRouteWaypointRepository().existsById(id)) {
            throw new EntityNotFoundException("Punto de ruta no encontrado.");
        }

        getRouteWaypointRepository().deleteById(id);
        return CrudResponseDto.success(RouteWaypointMapper.toDto(null), "Punto de ruta eliminado correctamente");
    }

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
        return CrudResponseDto.success(getRouteWaypointRepository().existsById(id), "Verificación de existencia completada");
    }

    public CrudResponseDto<List<RouteWaypointDto>> findByRouteId(Long routeId) {
        List<RouteWaypointDomain> waypoints = getRouteWaypointRepository().findByRouteId(routeId);
        List<RouteWaypointDto> dtos = convertToDtoList(waypoints);
        return CrudResponseDto.success(dtos, "Puntos de ruta encontrados para la ruta: " + routeId);
    }

    public List<RouteWaypointDto> convertToDtoList(List<RouteWaypointDomain> entities) {
        return entities.stream()
                .map(RouteWaypointMapper::toDto)
                .toList();
    }

    public List<RouteWaypointDto> findByRoute(Long routeId) {
        RouteDomain route = getRouteRepository().findById(routeId)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));

        List<RouteWaypointDomain> entities = getRouteWaypointRepository().findByRouteId(routeId);
        return convertToDtoList(entities);
    }

}
