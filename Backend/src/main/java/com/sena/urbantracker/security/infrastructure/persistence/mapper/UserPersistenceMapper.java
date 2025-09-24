package com.sena.urbantracker.security.infrastructure.persistence.mapper;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.infrastructure.persistence.model.UserModel;

public class UserPersistenceMapper {

    public static UserModel toModel(UserDomain domain) {
        if (domain == null) return null;
        return UserModel.builder()
                .id(domain.getId())
                .userName(domain.getUsername())
                .password(domain.getPassword())
                .active(domain.getActive())
                .role(RolePersistenceMapper.toModel(domain.getRole()))
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .lastLogin(domain.getLastLogin())
                .build();
    }

    public static UserDomain toDomain(UserModel model) {
        if (model == null) return null;
        return UserDomain.builder()
                .id(model.getId())
                .userName(model.getUsername())
                .password(model.getPassword())
                .active(model.getActive())
                .role(RolePersistenceMapper.toDomain(model.getRole()))
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .lastLogin(model.getLastLogin())
                .build();
    }
}