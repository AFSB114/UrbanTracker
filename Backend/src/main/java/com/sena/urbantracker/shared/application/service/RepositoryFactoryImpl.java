package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.routes.domain.repository.IRoute;
import com.sena.urbantracker.routes.domain.repository.IRouteWaypoint;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.EnumMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class RepositoryFactoryImpl implements RepositoryFactory {

    private final IRoute routeRepository;
    private final IRouteWaypoint routeWaypointRepository;

    private Map<EntityType, Object> repositories;

    @PostConstruct
    public void init() {
        Map<EntityType, Object> map = new EnumMap<>(EntityType.class);

        map.put(EntityType.ROUTE, routeRepository);
        map.put(EntityType.ROUTE_WAYPOINT, routeWaypointRepository);

        repositories = Collections.unmodifiableMap(map);

        log.info("Repositorios registrados en RepositoryFactory:");
        repositories.forEach((key, value) ->
                log.info("   - {} -> {}", key, value.getClass().getSimpleName()));
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> T createRepository(EntityType entityType, Class<T> repositoryInterface) {
        Object repository = repositories.get(entityType);
        if (repository == null) {
            throw new RuntimeException("No repository registered for entity: " + entityType);
        }
        if (!repositoryInterface.isInstance(repository)) {
            throw new RuntimeException("Repository " + entityType + " does not implement " + repositoryInterface.getSimpleName());
        }
        return (T) repository;
    }

    @Override
    public boolean supports(EntityType entityType) {
        return repositories.containsKey(entityType);
    }
}