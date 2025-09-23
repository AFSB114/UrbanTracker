package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.UserProfileDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user-profiles")
public class UserProfileController extends BaseController<UserProfileDto, UserProfileDto, Long> {

    public UserProfileController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_PROFILE, UserProfileDto.class, UserProfileDto.class);
    }

    protected Class<UserProfileDto> getDtoClass() {
        return UserProfileDto.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileDto>> create(@Valid @RequestBody UserProfileDto dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<UserProfileDto>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<UserProfileDto>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileDto>> update(@PathVariable Long id, @Valid @RequestBody UserProfileDto dto) {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileDto>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}