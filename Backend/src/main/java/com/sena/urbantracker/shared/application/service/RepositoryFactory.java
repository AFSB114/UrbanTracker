package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;

public interface RepositoryFactory {

    <T, ID> CrudOperations<T, ID> createRepository(EntityType entityType, Class<T> dtoClass);

    <T> T createSpecializedRepository(EntityType entityType, Class<T> repositoryInterface);

    boolean supports(EntityType entityType);
}