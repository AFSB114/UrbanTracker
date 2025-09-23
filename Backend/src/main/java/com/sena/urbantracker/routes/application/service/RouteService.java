package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.application.mapper.RouteMapper;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.repository.IRoute;
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
public class RouteService implements CrudOperations<RouteReqDto, RouteResDto, Long> {

    @Lazy
    private final ServiceFactory serviceFactory;
    @Lazy
    private final RepositoryFactory repositoryFactory;

    private IRoute getRouteRepository() {
        return (IRoute) repositoryFactory.createRepository(EntityType.ROUTE, RouteDomain.class);
    }

    private RouteWaypointService getRouteWaypointService() {
        return (RouteWaypointService) serviceFactory.createCrudService(EntityType.ROUTE_WAYPOINT);
    }

    @Override
    public CrudResponseDto<RouteResDto> create(RouteReqDto request) {
        Integer numberRouteInt = Integer.valueOf(request.getNumberRoute());
        if (getRouteRepository().existsByNumberRoute(numberRouteInt)) {
            throw new EntityAlreadyExistsException("Ya existe una ruta con número: " + request.getNumberRoute());
        }

        RouteDomain entity = RouteMapper.toEntity(request);
        RouteDomain saved = getRouteRepository().save(entity);

        for (RouteWaypointReqDto waypointDto : request.getWaypoints()) {
            waypointDto.setRouteId(saved.getId());
            getRouteWaypointService().create(waypointDto);
        }

        return CrudResponseDto.success(RouteMapper.toDto(saved), "Ruta creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteResDto>> findById(Long id) {
        RouteDomain route = getRouteRepository().findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(RouteMapper.toDto(route)), "Ruta encontrada");
    }

    @Override
    public CrudResponseDto<List<RouteResDto>> findAll() {
        List<RouteResDto> dtos = getRouteRepository().findAll()
                .stream()
                .map(RouteMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de rutas");
    }

    @Override
    public CrudResponseDto<RouteResDto> update(RouteReqDto request, Long id) {
        RouteDomain route = getRouteRepository().findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Ruta no encontrada."));

        route.setNumberRoute(Integer.valueOf(request.getNumberRoute()));
        route.setDescription(request.getDescription());
        route.setTotalDistance(request.getTotalDistance());

        RouteDomain updated = getRouteRepository().save(route);
        return CrudResponseDto.success(RouteMapper.toDto(updated), "Ruta actualizada correctamente");
    }

    @Override
    public CrudResponseDto<RouteResDto> deleteById(Long id) {
        if (!getRouteRepository().existsById(id)) {
            throw new EntityNotFoundException("Ruta no encontrada.");
        }

        getRouteRepository().deleteById(id);
        return CrudResponseDto.success(RouteMapper.toDto(null), "Ruta eliminada correctamente");
    }

    @Override
    public CrudResponseDto<RouteResDto> activateById(Long id) {
        RouteDomain route = getRouteRepository().findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));
        route.setActive(true);
        getRouteRepository().save(route);
        return CrudResponseDto.success(RouteMapper.toDto(route), "Ruta activada");
    }

    @Override
    public CrudResponseDto<RouteResDto> deactivateById(Long id) {
        RouteDomain route = getRouteRepository().findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));
        route.setActive(false);
        getRouteRepository().save(route);
        return CrudResponseDto.success(RouteMapper.toDto(route), "Ruta desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(getRouteRepository().existsById(id), "Verificación de existencia completada");
    }

}
