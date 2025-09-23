package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.RepositoryOperations;

public interface RepositoryFactory {

    <T, ID> RepositoryOperations<T, ID> createRepository(EntityType entityType, Class<T> domainEntityClass);

    <T> T createSpecializedRepository(EntityType entityType, Class<T> repositoryInterface);

    boolean supports(EntityType entityType);
}