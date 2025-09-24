package com.sena.urbantracker.users.infrastructure.persistence.mapper;

import com.sena.urbantracker.users.domain.entity.IdentificationTypeDomain;
import com.sena.urbantracker.users.infrastructure.persistence.model.IdentificationTypeModel;

public class IdentificationTypePersistenceMapper {

    public static IdentificationTypeModel toModel(IdentificationTypeDomain domain) {
        if (domain == null) return null;
        return IdentificationTypeModel.builder()
                .id(domain.getId())
                .typeName(domain.getTypeName())
                .description(domain.getDescription())
                .country(domain.getCountry())
                .build();
    }

    public static IdentificationTypeDomain toDomain(IdentificationTypeModel model) {
        if (model == null) return null;
        return IdentificationTypeDomain.builder()
                .id(model.getId())
                .typeName(model.getTypeName())
                .description(model.getDescription())
                .country(model.getCountry())
                .build();
    }
}