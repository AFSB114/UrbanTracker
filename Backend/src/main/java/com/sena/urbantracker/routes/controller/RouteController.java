package com.sena.urbantracker.routes.controller;

import com.sena.urbantracker.routes.model.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.model.dto.request.RouteWithWaypointsReqDto;
import com.sena.urbantracker.routes.model.dto.response.RouteDto;
import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.service.ServiceFactory;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/routes")
public class RouteController extends BaseController<RouteDto, Long> {

    public RouteController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROUTE);
    }

    @Override
    protected Class<RouteDto> getDtoClass() {
        return RouteDto.class;
    }

    /**
     * Método personalizado para crear una ruta con waypoints
     */
    @PostMapping("/with-waypoints")
    public ResponseEntity<CrudResponseDto<RouteDto>> createRouteWithWaypoints(@Valid @RequestBody RouteWithWaypointsReqDto request) {
        // Lógica específica para manejar rutas con waypoints
        // Aquí podrías validar waypoints, calcular distancias, etc.

        RouteDto dto = new RouteDto();
        dto.setNumberRoute(request.getNumberRoute());
        dto.setDescription(request.getDescription());
        dto.setTotalDistance(request.getTotalDistance());

        // Crear la ruta primero
        CrudResponseDto<RouteDto> routeResponse = getService().create(dto);

        if (routeResponse.isSuccess()) {
            // Aquí podrías crear los waypoints usando el RoutePointService
            // Por simplicidad, retornamos la ruta creada
            return ResponseEntity.status(201).body(routeResponse);
        }

        return ResponseEntity.badRequest().body(routeResponse);
    }
}
