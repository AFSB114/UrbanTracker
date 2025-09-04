package com.sena.urbantracker.shared.service;

import com.sena.urbantracker.shared.exception.FactoryException;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.ActivableEntity;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.vehicles.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ServiceFactoryImpl implements ServiceFactory {

    private final Map<EntityType, CrudOperations<?, ?>> crudServices = new HashMap<>();

    private final Map<EntityType, ActivableEntity<?>> activableServices = new HashMap<>();

    public ServiceFactoryImpl(
            VehicleService vehicleService
    ) {

        crudServices.put(EntityType.VEHICLE, vehicleService);

        activableServices.put(EntityType.VEHICLE, vehicleService);
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T, ID> CrudOperations<T, ID> createCrudService(EntityType entityType) {
        CrudOperations<?, ?> service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException("No CRUD service registered for entity: " + entityType);
        }
        return (CrudOperations<T, ID>) service;
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> ActivableEntity<T> createActivableService(EntityType entityType) {
        ActivableEntity<?> service = activableServices.get(entityType);
        if (service == null) {
            throw new FactoryException("No Activable service registered for entity: " + entityType);
        }
        return (ActivableEntity<T>) service;
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface) {
        Object service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException("No service registered for entity: " + entityType);
        }

        if (!serviceInterface.isInstance(service)) {
            throw new FactoryException("Service " + entityType + " does not implement " + serviceInterface.getSimpleName());
        }

        return (T) service;
    }

    @Override
    public boolean supports(EntityType entityType) {
        return crudServices.containsKey(entityType) || activableServices.containsKey(entityType);
    }
}
