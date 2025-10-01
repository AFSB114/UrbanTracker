package com.sena.urbantracker.users.infrastructure.persistence.mapper;

import com.sena.urbantracker.security.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.users.infrastructure.persistence.model.DriverModel;
import com.sena.urbantracker.users.infrastructure.persistence.mapper.UserProfilePersistenceMapper;

public class DriverPersistenceMapper {

    public static DriverModel toModel(DriverDomain domain) {
        if (domain == null) return null;
        return DriverModel.builder()
                .id(domain.getId())
                .user(UserPersistenceMapper.toModel(domain.getUser()))
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static DriverDomain toDomain(DriverModel model) {
        if (model == null) return null;
        return DriverDomain.builder()
                .id(model.getId())
                .user(UserPersistenceMapper.toDomain(model.getUser()))
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}