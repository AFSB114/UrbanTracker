package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteTrajectoryReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteTrajectoryResDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/route-trajectorie")
public class RouteTrajectoryController extends BaseController<RouteTrajectoryReqDto, RouteTrajectoryResDto, Long> {

    public RouteTrajectoryController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROUTE_TRAJECTORY, RouteTrajectoryReqDto.class, RouteTrajectoryResDto.class);
    }
}