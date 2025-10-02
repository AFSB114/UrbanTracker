package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.routes.application.service.RouteScheduleService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.apache.coyote.BadRequestException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/route-schedule")
public class RouteScheduleController extends BaseController<RouteScheduleReqDto, RouteScheduleResDto, Long> {

    private final RouteScheduleService routeScheduleService;

    public RouteScheduleController(ServiceFactory serviceFactory, RouteScheduleService routeScheduleService) {
        super(serviceFactory, EntityType.ROUTE_SCHEDULE, RouteScheduleReqDto.class, RouteScheduleResDto.class);
        this.routeScheduleService = routeScheduleService;
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RouteScheduleResDto>>> createAll(@RequestBody List<RouteScheduleReqDto> dto) throws BadRequestException {
        CrudResponseDto<List<RouteScheduleResDto>>  res = routeScheduleService.createAll(dto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("/bulk/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RouteScheduleResDto>>> updateAll(@PathVariable Long id, @RequestBody List<RouteScheduleReqDto> dto) throws BadRequestException {
        CrudResponseDto<List<RouteScheduleResDto>>  res = routeScheduleService.updateAll(dto, id);
        return  ResponseEntity.status(HttpStatus.ACCEPTED).body(res);
    }
}
