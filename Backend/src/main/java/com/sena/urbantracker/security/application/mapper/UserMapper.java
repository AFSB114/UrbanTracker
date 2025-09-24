package com.sena.urbantracker.security.application.mapper;

import com.sena.urbantracker.security.application.dto.request.UserDTO;
import com.sena.urbantracker.security.application.dto.response.UserViewDTO;
import com.sena.urbantracker.security.domain.entity.UserDomain;

public class UserMapper {

    public static UserViewDTO toDto(UserDomain entity) {
        if (entity == null) return null;
        return UserViewDTO.builder()
                .id(entity.getId())
                .userName(entity.getUsername())
                .role(entity.getRole().getId())
                .build();
    }

    public static UserDomain toEntity(UserDTO dto) {
        if (dto == null) return null;
        return UserDomain.builder()
                .userName(dto.getUserName())
                .password(dto.getPassword())
                .active(true)
                .build();
    }
}