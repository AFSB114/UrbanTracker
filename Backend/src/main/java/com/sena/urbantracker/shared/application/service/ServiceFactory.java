package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import org.springframework.stereotype.Component;

@Component
public interface ServiceFactory {

    <DReq, DRes, ID> CrudOperations<DReq, DRes, ID> createCrudService(EntityType entityClass);

    <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface);

    <DReq, DRes, ID> CrudOperations<DReq, DRes, ID> getService(EntityType type, Class<DReq> dtoClass);

    boolean supports(EntityType entityType);
}
