package com.sena.urbantracker.users.application.mapper;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;

public class DriverMapper {

    public static DriverResDto toDto(DriverDomain entity, UserProfileDomain userProfileDomain) {
        if (entity == null) return null;
        return DriverResDto.builder()
                .id(entity.getId())
                .userId(entity.getUser().getUsername())
                .active(entity.getActive())
                .userProfile(UserProfileMapper.toDto(userProfileDomain))
                .build();
    }

    public static DriverDomain toEntity(DriverReqDto dto) {
        if (dto == null) return null;
        return DriverDomain.builder()
                .active(true)
                .build();
    }
}