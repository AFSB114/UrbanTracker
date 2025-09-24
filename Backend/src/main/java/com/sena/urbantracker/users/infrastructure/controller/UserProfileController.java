package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.UserProfileResDtoA;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user-profiles")
public class UserProfileController extends BaseController<UserProfileResDtoA, UserProfileResDtoA, Long> {

    public UserProfileController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_PROFILE, UserProfileResDtoA.class, UserProfileResDtoA.class);
    }

    protected Class<UserProfileResDtoA> getDtoClass() {
        return UserProfileResDtoA.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileResDtoA>> create(@Valid @RequestBody UserProfileResDtoA dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<UserProfileResDtoA>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<UserProfileResDtoA>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileResDtoA>> update(@PathVariable Long id, @Valid @RequestBody UserProfileResDtoA dto) {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileResDtoA>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}