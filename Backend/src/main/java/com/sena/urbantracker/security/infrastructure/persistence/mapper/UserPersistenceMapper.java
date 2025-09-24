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
                .role(RolePersistenceMapper.toModel(domain.getRole()))
                .lastLogin(domain.getLastLogin())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static UserDomain toDomain(UserModel model) {
        if (model == null) return null;
        return UserDomain.builder()
                .id(model.getId())
                .userName(model.getUserName())
                .password(model.getPassword())
                .role(RolePersistenceMapper.toDomain(model.getRole()))
                .lastLogin(model.getLastLogin())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}