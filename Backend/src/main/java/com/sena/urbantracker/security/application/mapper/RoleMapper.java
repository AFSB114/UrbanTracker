package com.sena.urbantracker.security.application.mapper;

import com.sena.urbantracker.security.application.dto.request.RoleReqDto;
import com.sena.urbantracker.security.application.dto.request.RoleResDto;
import com.sena.urbantracker.security.domain.entity.RoleDomain;

public class RoleMapper {

    public static RoleResDto toDto(RoleDomain entity) {
        if (entity == null) return null;
        return RoleResDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }

    public static RoleDomain toEntity(RoleReqDto dto) {
        if (dto == null) return null;
        return RoleDomain.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .active(true)
                .build();
    }
}