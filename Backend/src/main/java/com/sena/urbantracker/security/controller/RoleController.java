package com.sena.urbantracker.security.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.security.model.dto.response.RoleDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController extends BaseController<RoleDto, Long> {

    public RoleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROLE);
    }

    protected EntityType getEntityType() {
        return EntityType.ROLE;
    }

    @Override
    protected Class<RoleDto> getDtoClass() {
        return RoleDto.class;
    }

    @Override
    protected CrudOperations<RoleDto, Long> getService() {
        return serviceFactory.getService(EntityType.ROLE, RoleDto.class);
    }
}
