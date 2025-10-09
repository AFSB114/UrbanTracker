package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteTrajectoryReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteTrajectoryResDto;
import com.sena.urbantracker.routes.application.service.RouteTrajectoryService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/route-trajectorie")
public class RouteTrajectoryController extends BaseController<RouteTrajectoryReqDto, RouteTrajectoryResDto, Long> {

    private final RouteTrajectoryService routeTrajectoryService;

    public RouteTrajectoryController(ServiceFactory serviceFactory, RouteTrajectoryService routeTrajectoryService) {
        super(serviceFactory, EntityType.ROUTE_TRAJECTORY, RouteTrajectoryReqDto.class, RouteTrajectoryResDto.class);
        this.routeTrajectoryService = routeTrajectoryService;
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<CrudResponseDto<List<RouteTrajectoryResDto>>> findByDriverId(@PathVariable Long driverId) {
        return ResponseEntity.ok(routeTrajectoryService.findByDriverId(driverId));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<CrudResponseDto<List<RouteTrajectoryResDto>>> findByVehicleId(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(routeTrajectoryService.findByVehicleId(vehicleId));
    }
}