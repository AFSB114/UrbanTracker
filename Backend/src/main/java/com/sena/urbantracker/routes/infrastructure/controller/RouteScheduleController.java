package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/route-schedule")
public class RouteScheduleController extends BaseController<RouteScheduleReqDto, RouteScheduleResDto, Long> {

    public RouteScheduleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROUTE_SCHEDULE, RouteScheduleReqDto.class, RouteScheduleResDto.class);
    }
}