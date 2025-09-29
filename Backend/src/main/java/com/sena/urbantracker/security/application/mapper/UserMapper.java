package com.sena.urbantracker.security.application.mapper;

import com.sena.urbantracker.security.application.dto.request.UserReqDto;
import com.sena.urbantracker.security.application.dto.request.UserResDto;
import com.sena.urbantracker.security.domain.entity.UserDomain;

public class UserMapper {

    public static UserResDto toDto(UserDomain entity) {
        if (entity == null) return null;
        return UserResDto.builder()
                .id(entity.getId())
                .userName(entity.getUsername())
                .role(RoleMapper.toDto(entity.getRole()))
                .lastLogin(entity.getLastLogin())
                .build();
    }

    public static UserDomain toEntity(UserReqDto dto) {
        if (dto == null) return null;
        return UserDomain.builder()
                .userName(dto.getUserName())
                .password(dto.getPassword())
                .active(true)
                .build();
    }
}