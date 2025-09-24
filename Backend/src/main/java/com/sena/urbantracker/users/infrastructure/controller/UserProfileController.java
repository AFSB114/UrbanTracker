package com.sena.urbantracker.users.infrastructure.controller;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.infrastructure.controller.BaseController;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.users.application.dto.response.UserProfileResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user-profile")
public class UserProfileController extends BaseController<UserProfileResDto, UserProfileResDto, Long> {

    public UserProfileController(ServiceFactory serviceFactory) {
        super(serviceFactory, EntityType.USER_PROFILE, UserProfileResDto.class, UserProfileResDto.class);
    }

    protected Class<UserProfileResDto> getDtoClass() {
        return UserProfileResDto.class;
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileResDto>> create(@Valid @RequestBody UserProfileResDto dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<Optional<UserProfileResDto>>> findById(@PathVariable Long id) {
        return super.findById(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<List<UserProfileResDto>>> findAll() {
        return super.findAll();
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileResDto>> update(@PathVariable Long id, @Valid @RequestBody UserProfileResDto dto) {
        return super.update(id, dto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<UserProfileResDto>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}