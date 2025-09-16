package com.sena.urbantracker.shared.service;

import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import org.springframework.stereotype.Component;

@Component
public interface ServiceFactory {

    <T, ID> CrudOperations<T, ID> createCrudService(EntityType entityClass);

    <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface);

    <T, ID> CrudOperations<T, ID> getService(EntityType type, Class<T> dtoClass);

    boolean supports(EntityType entityType);
}
