package com.sena.urbantracker.security.infrastructure.persistence.mapper;

import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.infrastructure.persistence.model.RoleModel;

public class RolePersistenceMapper {

    public static RoleModel toModel(RoleDomain domain) {
        if (domain == null) return null;
        return RoleModel.builder()
                .id(domain.getId())
                .name(domain.getName())
                .description(domain.getDescription())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static RoleDomain toDomain(RoleModel model) {
        if (model == null) return null;
        return RoleDomain.builder()
                .id(model.getId())
                .name(model.getName())
                .description(model.getDescription())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}