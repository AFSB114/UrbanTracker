package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import org.springframework.stereotype.Component;

@Component
public interface ServiceFactory {

    <T, ID> CrudOperations<T, T, ID> createCrudService(EntityType entityClass);

    <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface);

    <T, ID> CrudOperations<T, T, ID> getService(EntityType type, Class<T> dtoClass);

    boolean supports(EntityType entityType);
}
