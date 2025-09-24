package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/routes")
public class RouteController extends BaseController<RouteReqDto, RouteResDto, Long> {

    public RouteController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROUTE, RouteReqDto.class, RouteResDto.class);
    }
}
