package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteWaypointResDto;
import com.sena.urbantracker.routes.application.service.RouteWaypointService;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/route-waypoint")
public class RouteWaypointController extends BaseController<RouteWaypointReqDto, RouteWaypointResDto, Long> {

    private final RouteWaypointService routeWaypointService;

    public RouteWaypointController(ServiceFactory serviceFactory, RouteWaypointService routeWaypointService) {
        super(serviceFactory, EntityType.ROUTE_WAYPOINT, RouteWaypointReqDto.class, RouteWaypointResDto.class);
        this.routeWaypointService = routeWaypointService;
    }

    @GetMapping("/route/{routeId}")
    public ResponseEntity<CrudResponseDto<List<RouteWaypointReqDto>>> findByRouteId(@PathVariable Long routeId) {
        CrudResponseDto<List<RouteWaypointReqDto>> response = routeWaypointService.findByRouteId(routeId);
        return ResponseEntity.ok(response);
    }
}
