package com.sena.urbantracker.security.application.mapper;

import com.sena.urbantracker.security.application.dto.request.RecoveryRequestReqDto;
import com.sena.urbantracker.security.application.dto.request.RecoveryRequestResDto;
import com.sena.urbantracker.security.domain.entity.RecoveryRequestDomain;

public class RecoveryRequestMapper {

    public static RecoveryRequestResDto toDto(RecoveryRequestDomain entity) {
        if (entity == null) return null;
        return RecoveryRequestResDto.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .expirationTime(entity.getExpirationTime())
                .user(UserMapper.toDto(entity.getUser()))
                .build();
    }

    public static RecoveryRequestDomain toEntity(RecoveryRequestReqDto dto) {
        if (dto == null) return null;
        return RecoveryRequestDomain.builder()
                .code(dto.getCode())
                .expirationTime(dto.getExpirationTime())
                .active(true)
                .build();
    }
}