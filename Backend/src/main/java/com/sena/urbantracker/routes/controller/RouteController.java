package com.sena.urbantracker.routes.controller;

import com.sena.urbantracker.routes.model.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.model.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.model.dto.response.RouteDto;
import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.service.RouteService;
import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.service.ServiceFactory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/routes")
public class RouteController extends BaseController<RouteDto, Long> {

    private final RouteService routeService;

    public RouteController(ServiceFactory serviceFactory, RouteService routeService) {
        super(serviceFactory, EntityType.ROUTE);
        this.routeService = routeService;
    }

    @Override
    protected Class<RouteDto> getDtoClass() {
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
