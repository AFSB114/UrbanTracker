package com.sena.urbantracker.users.application.mapper;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.users.application.dto.request.UserProfileReqDto;
import com.sena.urbantracker.users.application.dto.response.UserProfileResDto;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;

public class UserProfileMapper {

    public static UserProfileResDto toDto(UserProfileDomain entity) {
        if (entity == null) return null;
        return UserProfileResDto.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .userId(entity.getUser().getId())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static UserProfileDomain toEntity(UserProfileReqDto dto) {
        if (dto == null) return null;
        return UserProfileDomain.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .user(UserDomain.builder()
                        .id(dto.getUserId())
                        .build()
                )
                .active(true)
                .build();
    }
}