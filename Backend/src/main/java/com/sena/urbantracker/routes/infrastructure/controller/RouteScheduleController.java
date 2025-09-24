package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.routes.application.service.RouteScheduleService;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/route-schedules")
public class RouteScheduleController extends BaseController<RouteScheduleReqDto, RouteScheduleResDto, Long> {

    private final RouteScheduleService routeScheduleService;

    public RouteScheduleController(ServiceFactory serviceFactory, RouteScheduleService routeScheduleService) {
        super(serviceFactory, EntityType.ROUTE_SCHEDULE, RouteScheduleReqDto.class, RouteScheduleResDto.class);
        this.routeScheduleService = routeScheduleService;
    }
}