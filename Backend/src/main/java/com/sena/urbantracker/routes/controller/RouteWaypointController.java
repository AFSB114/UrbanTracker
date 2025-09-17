package com.sena.urbantracker.routes.controller;

import com.sena.urbantracker.routes.model.dto.response.RouteWaypointDto;
import com.sena.urbantracker.routes.service.RouteWaypointService;
import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/route-waypoints")
public class RouteWaypointController extends BaseController<RouteWaypointDto, Long> {

    private final RouteWaypointService routeWaypointService;

    public RouteWaypointController(ServiceFactory serviceFactory, RouteWaypointService routeWaypointService) {
        super(serviceFactory, EntityType.ROUTE_WAYPOINT);
        this.routeWaypointService = routeWaypointService;
    }

    @Override
    protected Class<RouteWaypointDto> getDtoClass() {
        return RouteWaypointDto.class;
    }

    @GetMapping("/route/{routeId}")
    public ResponseEntity<CrudResponseDto<List<RouteWaypointDto>>> findByRouteId(@PathVariable Long routeId) {
        CrudResponseDto<List<RouteWaypointDto>> response = routeWaypointService.findByRouteId(routeId);
        return ResponseEntity.ok(response);
    }
}
