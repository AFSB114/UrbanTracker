package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.response.RouteDto;
import com.sena.urbantracker.routes.application.service.RouteService;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/routes")
public class RouteController extends BaseController<BaseRouteReqDto, RouteDto, Long> {

    private final RouteService routeService;

    public RouteController(ServiceFactory serviceFactory, RouteService routeService) {
        super(serviceFactory, EntityType.ROUTE);
        this.routeService = routeService;
    }

    @Override
    protected Class<BaseRouteReqDto> getRequestDtoClass() {
        return BaseRouteReqDto.class;
    }

    @Override
    protected Class<RouteDto> getResponseDtoClass() {
        return RouteDto.class;
    }

    /**
     * Método personalizado para crear una ruta con waypoints
     */
    @PostMapping("/with-waypoints")
    public ResponseEntity<CrudResponseDto<Void>> createRouteWithWaypoints(@Valid @RequestBody RouteWithWaypointsReqDto request) {
        // Usar el método personalizado addRoute del servicio
        routeService.addRoute(request);

        return ResponseEntity.status(201).body(CrudResponseDto.success(null, "Ruta con waypoints creada exitosamente"));
    }
}
