package com.sena.urbantracker.shared.application.service;

import com.sena.urbantracker.routes.application.service.RouteScheduleService;
import com.sena.urbantracker.routes.application.service.RouteTrajectoryService;
import com.sena.urbantracker.shared.infrastructure.exception.FactoryException;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.security.application.service.RoleService;
import com.sena.urbantracker.security.application.service.UserService;
import com.sena.urbantracker.security.application.service.RecoveryRequestService;
import com.sena.urbantracker.users.application.service.CompanyService;
import com.sena.urbantracker.users.application.service.DriverService;
import com.sena.urbantracker.users.application.service.IdentificationTypeService;
import com.sena.urbantracker.users.application.service.UserIdentificationService;
import com.sena.urbantracker.users.application.service.UserProfileService;
import com.sena.urbantracker.vehicles.application.service.VehicleService;
import com.sena.urbantracker.vehicles.application.service.VehicleTypeService;
import com.sena.urbantracker.vehicles.application.service.VehicleAssigmentService;
import com.sena.urbantracker.routes.application.service.RouteService;
import com.sena.urbantracker.routes.application.service.RouteWaypointService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

/**
 * ServiceFactoryImpl acts as a central registry mapping EntityType to the corresponding CrudOperations service.
 * It enables generic controllers (BaseController) to delegate CRUD endpoints without wiring each service explicitly.
 * Benefits:
 * - Reduces boilerplate in controllers by using a single BaseController for CRUD across entities.
 * - Centralized registration helps ensure a single place to audit exposed CRUD services.
 * Notes:
 * - Prefer direct constructor injection in controllers when you need custom endpoints only and no generic CRUD.
 * - Avoid eager initialization issues by keeping potentially cyclic dependencies @Lazy (as applied to RouteService).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceFactoryImpl implements ServiceFactory {

    private final VehicleService vehicleService;
    private final VehicleTypeService vehicleTypeService;
    private final VehicleAssigmentService vehicleAssigmentService;
    private final DriverService driverService;
    private final CompanyService companyService;
    private final IdentificationTypeService identificationTypeService;
    private final UserIdentificationService userIdentificationService;
    private final UserProfileService userProfileService;
    private final RoleService roleService;
    private final UserService userService;
    private final RecoveryRequestService recoveryRequestService;
    // Routes
    private final RouteService routeService;
    private final RouteWaypointService routeWaypointService;
    private final RouteScheduleService routeScheduleService;
    private final RouteTrajectoryService routeTrajectoryService;

    private Map<EntityType, CrudOperations<?, ?, ?>> crudServices;

    @PostConstruct
    public void init() {
        Map<EntityType, CrudOperations<?, ?, ?>> map = new EnumMap<>(EntityType.class);

        map.put(EntityType.VEHICLE, vehicleService);
        map.put(EntityType.VEHICLE_TYPE, vehicleTypeService);
        map.put(EntityType.VEHICLE_ASSIGMENT, vehicleAssigmentService);
        map.put(EntityType.DRIVER, driverService);
        map.put(EntityType.COMPANY, companyService);
        map.put(EntityType.IDENTIFICATION_TYPE, identificationTypeService);
        map.put(EntityType.USER_IDENTIFICATION, userIdentificationService);
        map.put(EntityType.USER_PROFILE, userProfileService);
        map.put(EntityType.ROLE, roleService);
        map.put(EntityType.USER, userService);
        map.put(EntityType.RECOVERY_REQUEST, recoveryRequestService);
        // Routes
        map.put(EntityType.ROUTE, routeService);
        map.put(EntityType.ROUTE_WAYPOINT, routeWaypointService);
        map.put(EntityType.ROUTE_SCHEDULE, routeScheduleService);
        map.put(EntityType.ROUTE_TRAJECTORY, routeTrajectoryService);

        // Hacemos el mapa inmutable para evitar modificaciones en runtime
        crudServices = Collections.unmodifiableMap(map);

        log.info("Servicios CRUD registrados en ServiceFactory:");
        crudServices.forEach((key, value) ->
                log.info("   - {} -> {}", key, value.getClass().getSimpleName()));
    }

    @SuppressWarnings("unchecked")
    @Override
    public <DReq, DRes, ID> CrudOperations<DReq, DRes, ID> createCrudService(EntityType entityType) {

        CrudOperations<?, ?, ?> service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException(
                    "No CRUD service registered for entity: " + entityType,
                    entityType,
                    "CRUD_CREATE"
            );
        }
        try {
            @SuppressWarnings("unchecked")
            CrudOperations<DReq, DRes, ID> typedService = (CrudOperations<DReq, DRes, ID>) service;
            log.debug("[Factory] Servicio CRUD obtenido para {} -> {}",
                    entityType, typedService.getClass().getSimpleName());
            return typedService;
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
        CrudOperations<?, ?, ?> service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException(
                    "No service registered for entity: " + entityType,
                    entityType,
                    "SPECIALIZED"
            );
        }

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
        log.trace("[Factory] getService llamado con EntityType={}, DTO={}",  //logTrace: capturar información extremadamente detallada sobre la ejecución
                type, dtoClass.getSimpleName());
        return createCrudService(type);
    }

    @Override
    public boolean supports(EntityType entityType) {
        boolean supported = crudServices.containsKey(entityType);
        log.trace("[Factory] supports({}) -> {}", entityType, supported);
        return supported;
    }
}
