package com.sena.urbantracker.security.infrastructure.controller;

import com.sena.urbantracker.security.application.dto.request.RecoveryRequestReqDto;
import com.sena.urbantracker.security.application.dto.response.RecoveryRequestResDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/security/recovery-requests")
public class RecoveryRequestController extends BaseController<RecoveryRequestReqDto, RecoveryRequestResDto, Long> {

    public RecoveryRequestController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.RECOVERY_REQUEST, RecoveryRequestReqDto.class, RecoveryRequestResDto.class);
    }
}