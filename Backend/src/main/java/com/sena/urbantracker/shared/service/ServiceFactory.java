package com.sena.urbantracker.shared.service;

import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.ActivableEntity;
import com.sena.urbantracker.shared.repository.CrudOperations;

public interface ServiceFactory {

    <T, ID> CrudOperations<T, ID> createCrudService(EntityType entityClass);

    <T> ActivableEntity<T> createActivableService(EntityType entityType);

    <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface);

    boolean supports(EntityType entityType);
}
