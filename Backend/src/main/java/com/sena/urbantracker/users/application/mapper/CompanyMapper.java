package com.sena.urbantracker.users.application.mapper;

import com.sena.urbantracker.users.application.dto.request.CompanyReqDto;
import com.sena.urbantracker.users.application.dto.response.CompanyResDto;
import com.sena.urbantracker.users.domain.entity.CompanyDomain;

public class CompanyMapper {

    public static CompanyResDto toDto(CompanyDomain entity) {
        if (entity == null) return null;
        return CompanyResDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .nit(entity.getNit())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .country(entity.getCountry())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static CompanyDomain toEntity(CompanyReqDto dto) {
        if (dto == null) return null;
        return CompanyDomain.builder()
                .name(dto.getName())
                .nit(dto.getNit())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .country(dto.getCountry())
                .active(true)
                .build();
    }
}