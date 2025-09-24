package com.sena.urbantracker.security.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.security.application.dto.response.RoleResDtoA;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController extends BaseController<RoleResDtoA, RoleResDtoA, Long> {

    public RoleController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.ROLE, RoleResDtoA.class, RoleResDtoA.class);
    }

    protected Class<RoleResDtoA> getDtoClass() {
        return RoleResDtoA.class;
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<RoleResDtoA>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<RoleResDtoA>>> findAll() {
        return super.findAll();
    }

}