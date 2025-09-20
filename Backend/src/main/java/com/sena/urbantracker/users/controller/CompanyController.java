package com.sena.urbantracker.users.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.users.model.dto.response.CompanyDTO;
import com.sena.urbantracker.shared.model.dto.ResponseDTO;
import com.sena.urbantracker.users.model.dto.response.DriverDto;
import com.sena.urbantracker.users.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/public/company")
public class CompanyController extends BaseController<CompanyDTO, Long> {

    public CompanyController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.COMPANY);
    }

    @Override
    protected Class<CompanyDTO> getDtoClass() {
        return CompanyDTO.class;
    }

}
