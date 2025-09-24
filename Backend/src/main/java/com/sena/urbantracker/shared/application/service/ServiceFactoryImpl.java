package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.routes.application.service.RouteScheduleService;
import com.sena.urbantracker.routes.application.service.RouteService;
import com.sena.urbantracker.routes.application.service.RouteTrajectoryService;
import com.sena.urbantracker.routes.application.service.RouteWaypointService;
import com.sena.urbantracker.security.application.service.RoleService;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.infrastructure.exception.FactoryException;
import com.sena.urbantracker.users.application.service.CompanyService;
import com.sena.urbantracker.users.application.service.DriverService;
import com.sena.urbantracker.users.application.service.IdentificationTypeService;
import com.sena.urbantracker.users.application.service.UserIdentificationService;
import com.sena.urbantracker.users.application.service.UserProfileService;
import com.sena.urbantracker.vehicles.application.service.VehicleAssigmentService;
import com.sena.urbantracker.vehicles.application.service.VehicleService;
import com.sena.urbantracker.vehicles.application.service.VehicleTypeService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.Map;
import java.util.function.Supplier;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceFactoryImpl implements ServiceFactory {

    private final ApplicationContext applicationContext;

    private Map<EntityType, Supplier<CrudOperations<?, ?, ?>>> providers;

    @PostConstruct
    public void init() {
        EnumMap<EntityType, Supplier<CrudOperations<?, ?, ?>>> map = new EnumMap<>(EntityType.class);

        // Vehicles
        map.put(EntityType.VEHICLE, () -> applicationContext.getBean(VehicleService.class));
        map.put(EntityType.VEHICLE_TYPE, () -> applicationContext.getBean(VehicleTypeService.class));
        map.put(EntityType.VEHICLE_ASSIGMENT, () -> applicationContext.getBean(VehicleAssigmentService.class));

        // Users
        map.put(EntityType.DRIVER, () -> applicationContext.getBean(DriverService.class));
        map.put(EntityType.COMPANY, () -> applicationContext.getBean(CompanyService.class));
        map.put(EntityType.IDENTIFICATION_TYPE, () -> applicationContext.getBean(IdentificationTypeService.class));
        map.put(EntityType.USER_IDENTIFICATION, () -> applicationContext.getBean(UserIdentificationService.class));
        map.put(EntityType.USER_PROFILE, () -> applicationContext.getBean(UserProfileService.class));
        map.put(EntityType.ROLE, () -> applicationContext.getBean(RoleService.class));

        // Routes
        map.put(EntityType.ROUTE, () -> applicationContext.getBean(RouteService.class));
        map.put(EntityType.ROUTE_WAYPOINT, () -> applicationContext.getBean(RouteWaypointService.class));
        map.put(EntityType.ROUTE_SCHEDULE, () -> applicationContext.getBean(RouteScheduleService.class));
        map.put(EntityType.ROUTE_TRAJECTORY, () -> applicationContext.getBean(RouteTrajectoryService.class));

        providers = Map.copyOf(map);

        log.info("Servicios CRUD registrados en ServiceFactory (lazy):");
        providers.forEach((key, value) -> log.info("   - {}", key));
    }

    @SuppressWarnings("unchecked")
    @Override
    public <DReq, DRes, ID> CrudOperations<DReq, DRes, ID> createCrudService(EntityType entityType) {
        Supplier<CrudOperations<?, ?, ?>> supplier = providers.get(entityType);
        if (supplier == null) {
            throw new FactoryException(
                    "No CRUD service registered for entity: " + entityType,
                    entityType,
                    "CRUD_CREATE"
            );
        }
        try {
            CrudOperations<?, ?, ?> service = supplier.get();
            log.debug("[Factory] Servicio CRUD obtenido para {} -> {}", entityType, service.getClass().getSimpleName());
            return (CrudOperations<DReq, DRes, ID>) service;
        } catch (ClassCastException e) {
            log.error("Error de tipo al transmitir el servicio para {}: {}", entityType, e.getMessage());
            throw new FactoryException(
                    "Type mismatch for entity: " + entityType,
                    entityType,
                    "CRUD_CREATE"
            );
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface) {
        Supplier<CrudOperations<?, ?, ?>> supplier = providers.get(entityType);
        if (supplier == null) {
            throw new FactoryException(
                    "No service registered for entity: " + entityType,
                    entityType,
                    "SPECIALIZED"
            );
        }
        Object service = supplier.get();
        if (!serviceInterface.isInstance(service)) {
            throw new FactoryException(
                    "Service " + entityType + " does not implement " + serviceInterface.getSimpleName(),
                    entityType,
                    "SPECIALIZED"
            );
        }
        return (T) service;
    }

    @Override
    public <DReq, DRes, ID> CrudOperations<DReq, DRes, ID> getService(EntityType type, Class<DReq> dtoClass) {
        log.trace("[Factory] getService llamado con EntityType={}, DTO={}", type, dtoClass.getSimpleName());
        return createCrudService(type);
    }

    @Override
    public boolean supports(EntityType entityType) {
        boolean supported = providers.containsKey(entityType);
        log.trace("[Factory] supports({}) -> {}", entityType, supported);
        return supported;
    }
}
