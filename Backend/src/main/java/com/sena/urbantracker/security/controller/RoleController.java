package com.sena.urbantracker.security.controller;

import com.sena.urbantracker.shared.controller.BaseController;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import com.sena.urbantracker.security.model.dto.response.RoleDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/v1/role")
public class RoleController extends BaseController<RoleDto, Long> {

    public RoleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROLE);
        log.info("🚀 RoleController inicializado correctamente");
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
        log.info("Obteniendo servicio CRUD para Role desde la fábrica");
        return serviceFactory.getService(EntityType.ROLE, RoleDto.class);
    }
}
