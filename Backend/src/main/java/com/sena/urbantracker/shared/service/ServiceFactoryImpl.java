package com.sena.urbantracker.shared.service;

import com.sena.urbantracker.shared.exception.FactoryException;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.security.service.RoleService;
import com.sena.urbantracker.users.service.CompanyService;
import com.sena.urbantracker.users.service.DriverService;
import com.sena.urbantracker.users.service.IdentificationTypeService;
import com.sena.urbantracker.users.service.UserIdentificationService;
import com.sena.urbantracker.vehicles.service.VehicleAssigmentsService;
import com.sena.urbantracker.vehicles.service.VehicleService;
import com.sena.urbantracker.vehicles.service.VehicleTypeService;
import com.sena.urbantracker.routes.service.RouteService;
import com.sena.urbantracker.routes.service.RouteWaypointService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceFactoryImpl implements ServiceFactory {

    private final VehicleService vehicleService;
    private final VehicleTypeService vehicleTypeService;
    private final VehicleAssigmentsService vehicleAssigmentService;
    private final DriverService driverService;
    private final CompanyService companyService;
    private final IdentificationTypeService identificationTypeService;
    private final UserIdentificationService userIdentificationService;
    private final RoleService roleService;
    private final RouteService routeService;
    private final RouteWaypointService routeWaypointService;

    private Map<EntityType, CrudOperations<?, ?>> crudServices;

    @PostConstruct
    public void init() {
        Map<EntityType, CrudOperations<?, ?>> map = new EnumMap<>(EntityType.class);

        map.put(EntityType.VEHICLE, vehicleService);
        map.put(EntityType.VEHICLE_TYPE, vehicleTypeService);
        map.put(EntityType.VEHICLE_ASSIGMENT, vehicleAssigmentService);
        map.put(EntityType.DRIVER, driverService);
        map.put(EntityType.COMPANY, companyService);
        map.put(EntityType.IDENTIFICATION_TYPE, identificationTypeService);
        map.put(EntityType.USER_IDENTIFICATION, userIdentificationService);
        map.put(EntityType.ROLE, roleService);
        map.put(EntityType.ROUTE, routeService);
        map.put(EntityType.ROUTE_WAYPOINT, routeWaypointService);

        // Hacemos el mapa inmutable para evitar modificaciones en runtime
        crudServices = Collections.unmodifiableMap(map);

        log.info("Servicios CRUD registrados en ServiceFactory:");
        crudServices.forEach((key, value) ->
                log.info("   - {} -> {}", key, value.getClass().getSimpleName()));
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T, ID> CrudOperations<T, ID> createCrudService(EntityType entityType) {
        CrudOperations<?, ?> service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException(
                    "No CRUD service registered for entity: " + entityType,
                    entityType,
                    "CRUD_CREATE"
            );
        }
        try {
            @SuppressWarnings("unchecked")
            CrudOperations<T, ID> typedService = (CrudOperations<T, ID>) service;
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
        CrudOperations<?, ?> service = crudServices.get(entityType);
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
    public <T, ID> CrudOperations<T, ID> getService(EntityType type, Class<T> dtoClass) {
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
