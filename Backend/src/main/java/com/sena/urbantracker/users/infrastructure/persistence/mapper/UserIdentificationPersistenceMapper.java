package com.sena.urbantracker.users.infrastructure.persistence.mapper;

import com.sena.urbantracker.security.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.sena.urbantracker.users.domain.entity.UserIdentificationDomain;
import com.sena.urbantracker.users.infrastructure.persistence.model.UserIdentificationModel;

public class UserIdentificationPersistenceMapper {

    public static UserIdentificationModel toModel(UserIdentificationDomain domain) {
        if (domain == null) return null;
        return UserIdentificationModel.builder()
                .id(domain.getId())
                .user(UserProfilePersistenceMapper.toModel(domain.getUser()))
                .identificationType(IdentificationTypePersistenceMapper.toModel(domain.getIdentificationType()))
                .identificationNumber(domain.getIdentificationNumber())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public static UserIdentificationDomain toDomain(UserIdentificationModel model) {
        if (model == null) return null;
        return UserIdentificationDomain.builder()
                .id(model.getId())
                .user(UserProfilePersistenceMapper.toDomain(model.getUser()))
                .identificationType(IdentificationTypePersistenceMapper.toDomain(model.getIdentificationType()))
                .identificationNumber(model.getIdentificationNumber())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .build();
    }
}