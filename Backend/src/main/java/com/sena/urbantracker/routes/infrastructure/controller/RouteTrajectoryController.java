package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteTrajectoryReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteTrajectoryResDto;
import com.sena.urbantracker.routes.application.service.RouteTrajectoryService;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/route-trajectories")
public class RouteTrajectoryController extends BaseController<RouteTrajectoryReqDto, RouteTrajectoryResDto, Long> {

    private final RouteTrajectoryService routeTrajectoryService;

    public RouteTrajectoryController(ServiceFactory serviceFactory, RouteTrajectoryService routeTrajectoryService) {
        super(serviceFactory, EntityType.ROUTE_TRAJECTORY, RouteTrajectoryReqDto.class, RouteTrajectoryResDto.class);
        this.routeTrajectoryService = routeTrajectoryService;
    }
}