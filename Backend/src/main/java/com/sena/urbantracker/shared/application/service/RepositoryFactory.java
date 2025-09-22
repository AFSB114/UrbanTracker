package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.shared.domain.enums.EntityType;

public interface RepositoryFactory {

    <T> T createRepository(EntityType entityType, Class<T> repositoryInterface);

    boolean supports(EntityType entityType);
}