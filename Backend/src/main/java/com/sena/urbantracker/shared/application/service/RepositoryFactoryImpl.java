package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.routes.domain.repository.IRoute;
import com.sena.urbantracker.routes.domain.repository.IRouteWaypoint;
import com.sena.urbantracker.routes.infrastructure.repository.RouteRepositoryImpl;
import com.sena.urbantracker.routes.infrastructure.repository.RouteWaypointRepositoryImpl;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.RepositoryOperations;
import com.sena.urbantracker.shared.infrastructure.exception.FactoryException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RepositoryFactoryImpl implements RepositoryFactory {

    private final RouteRepositoryImpl routeRepository;
    private final RouteWaypointRepositoryImpl routeWaypointRepository;

    private final Map<EntityType, RepositoryOperations<?, ?>> repositoryMap = new HashMap<>();

    @PostConstruct
    private void init() {
        repositoryMap.put(EntityType.ROUTE, routeRepository);
        repositoryMap.put(EntityType.ROUTE_WAYPOINT, routeWaypointRepository);
    }

    @Override
    public <T, ID> RepositoryOperations<T, ID> createRepository(EntityType entityType, Class<T> domainEntityClass) {
        // Validate that the class is a domain entity
        if (!isDomainEntity(domainEntityClass)) {
            throw new FactoryException("Class " + domainEntityClass.getSimpleName() + " is not a valid domain entity");
        }

        @SuppressWarnings("unchecked")
        RepositoryOperations<T, ID> repository = (RepositoryOperations<T, ID>) repositoryMap.get(entityType);
        if (repository == null) {
            throw new FactoryException("No repository found for entity type: " + entityType);
        }
        return repository;
    }

    @Override
    public <T> T createSpecializedRepository(EntityType entityType, Class<T> repositoryInterface) {
        if (entityType == EntityType.ROUTE && repositoryInterface == IRoute.class) {
            return repositoryInterface.cast(routeRepository);
        }
        if (entityType == EntityType.ROUTE_WAYPOINT && repositoryInterface == IRouteWaypoint.class) {
            return repositoryInterface.cast(routeWaypointRepository);
        }
        throw new FactoryException("No specialized repository found for entity type: " + entityType + " and interface: " + repositoryInterface.getSimpleName());
    }

    @Override
    public boolean supports(EntityType entityType) {
        return repositoryMap.containsKey(entityType);
    }

    private boolean isDomainEntity(Class<?> clazz) {
        // Simple validation: check if class name ends with "Domain"
        return clazz.getSimpleName().endsWith("Domain");
    }
}