package com.sena.urbantracker.users.application.mapper;

import com.sena.urbantracker.users.application.dto.request.IdentificationTypeReqDto;
import com.sena.urbantracker.users.application.dto.response.IdentificationTypeResDto;
import com.sena.urbantracker.users.domain.entity.IdentificationTypeDomain;

public class IdentificationTypeMapper {

    public static IdentificationTypeResDto toDto(IdentificationTypeDomain entity) {
        if (entity == null) return null;
        return IdentificationTypeResDto.builder()
                .id(entity.getId())
                .typeName(entity.getTypeName())
                .description(entity.getDescription())
//                .active(entity.getActive())
//                .createdAt(entity.getCreatedAt())
//                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static IdentificationTypeDomain toEntity(IdentificationTypeReqDto dto) {
        if (dto == null) return null;
        return IdentificationTypeDomain.builder()
                .typeName(dto.getName())
                .description(dto.getDescription())
//                .active(true)
                .build();
    }
}