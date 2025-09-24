package com.sena.urbantracker.users.infrastructure.persistence.mapper;

import com.sena.urbantracker.users.domain.entity.CompanyDomain;
import com.sena.urbantracker.users.infrastructure.persistence.model.CompanyModel;

public class CompanyPersistenceMapper {

    public static CompanyModel toModel(CompanyDomain domain) {
        if (domain == null) return null;
        return CompanyModel.builder()
                .id(domain.getId())
                .name(domain.getName())
                .nit(domain.getNit())
                .phone(domain.getPhone())
                .email(domain.getEmail())
                .country(domain.getCountry())
                .active(domain.getActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public static CompanyDomain toDomain(CompanyModel model) {
        if (model == null) return null;
        return CompanyDomain.builder()
                .id(model.getId())
                .name(model.getName())
                .nit(model.getNit())
                .phone(model.getPhone())
                .email(model.getEmail())
                .country(model.getCountry())
                .active(model.getActive())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}