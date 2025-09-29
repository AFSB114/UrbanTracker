package com.sena.urbantracker.monitoring.infrastructure.controller;

import com.sena.urbantracker.monitoring.application.dto.request.TrackingReqDto;
import com.sena.urbantracker.monitoring.application.dto.response.TrackingResDto;
import com.sena.urbantracker.monitoring.application.service.TrackingService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tracking")
public class TrackingController extends BaseController<TrackingReqDto, TrackingResDto, Long> {

    private final TrackingService trackingService;

    public TrackingController(ServiceFactory serviceFactory, TrackingService trackingService) {
        super(serviceFactory, EntityType.TRACKING, TrackingReqDto.class, TrackingResDto.class);
        this.trackingService = trackingService;
    }

    // Additional endpoints if needed
}