package com.sena.urbantracker.security.infrastructure.persistence.mapper;

import com.sena.urbantracker.security.domain.entity.RecoveryRequestDomain;
import com.sena.urbantracker.security.infrastructure.persistence.model.RecoveryRequestModel;

public class RecoveryRequestPersistenceMapper {

    public static RecoveryRequestModel toModel(RecoveryRequestDomain domain) {
        if (domain == null) return null;
        return RecoveryRequestModel.builder()
                .id(domain.getId())
                .code(domain.getCode())
                .expirationTime(domain.getExpirationTime())
                .user(UserPersistenceMapper.toModel(domain.getUser()))
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static RecoveryRequestDomain toDomain(RecoveryRequestModel model) {
        if (model == null) return null;
        return RecoveryRequestDomain.builder()
                .id(model.getId())
                .code(model.getCode())
                .expirationTime(model.getExpirationTime())
                .user(UserPersistenceMapper.toDomain(model.getUser()))
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}