package com.sena.urbantracker.users.infrastructure.persistence.mapper;

import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.infrastructure.persistence.model.UserProfileModel;

public class UserProfilePersistenceMapper {

    public static UserProfileModel toModel(UserProfileDomain domain) {
        if (domain == null) return null;
        return UserProfileModel.builder()
                .id(domain.getId())
                .user(domain.getUser())
                .firstName(domain.getFirstName())
                .lastName(domain.getLastName())
                .email(domain.getEmail())
                .phone(domain.getPhone())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static UserProfileDomain toDomain(UserProfileModel model) {
        if (model == null) return null;
        return UserProfileDomain.builder()
                .id(model.getId())
                .user(model.getUser())
                .firstName(model.getFirstName())
                .lastName(model.getLastName())
                .email(model.getEmail())
                .phone(model.getPhone())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}