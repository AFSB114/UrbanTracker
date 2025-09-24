package com.sena.urbantracker.users.application.mapper;

import com.sena.urbantracker.users.application.dto.request.UserIdentificationReqDto;
import com.sena.urbantracker.users.application.dto.response.UserIdentificationResDto;
import com.sena.urbantracker.users.domain.entity.UserIdentificationDomain;

public class UserIdentificationMapper {

    public static UserIdentificationResDto toDto(UserIdentificationDomain entity) {
        if (entity == null) return null;
        return UserIdentificationResDto.builder()
                .id(entity.getId())
                .identificationTypeId(entity.getIdentificationTypeId())
                .identificationNumber(entity.getIdentificationNumber())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static UserIdentificationDomain toEntity(UserIdentificationReqDto dto) {
        if (dto == null) return null;
        return UserIdentificationDomain.builder()
                .identificationTypeId(dto.getIdentificationTypeId())
                .identificationNumber(dto.getIdentificationNumber())
                .active(true)
                .build();
    }
}