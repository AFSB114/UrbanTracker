package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.request.CompanyReqDto;
import com.sena.urbantracker.users.application.dto.response.CompanyResDTOA;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/companies")
public class CompanyController extends BaseController<CompanyReqDto, CompanyResDTOA, Long> {

    public CompanyController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.COMPANY, CompanyReqDto.class, CompanyResDTOA.class);
    }

    protected Class<CompanyResDTOA> getDtoClass() {
        return CompanyResDTOA.class;
    }
}