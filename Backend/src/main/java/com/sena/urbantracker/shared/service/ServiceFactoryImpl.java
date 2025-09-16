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
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Implementación del patrón Factory para servicios CRUD.
 * Centraliza la creación y gestión de servicios basados en EntityType.
 * Mantiene un registro de servicios para evitar acoplamiento directo entre controladores y servicios específicos.
 */
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

    /**
     * Mapa que registra los servicios CRUD por tipo de entidad.
     * Se inicializa en el método init() después de la construcción del bean.
     */
    private final Map<EntityType, CrudOperations<?, ?>> crudServices = new HashMap<>();

    /**
     * Inicializa el registro de servicios después de la construcción del bean.
     * Registra todos los servicios CRUD disponibles en el mapa por su EntityType correspondiente.
     */
    @PostConstruct
    public void init() {
        crudServices.put(EntityType.VEHICLE, vehicleService);
        crudServices.put(EntityType.VEHICLE_TYPE, vehicleTypeService);
        crudServices.put(EntityType.VEHICLE_ASSIGMENT, vehicleAssigmentService);
        crudServices.put(EntityType.DRIVER, driverService);
        crudServices.put(EntityType.COMPANY, companyService);
        crudServices.put(EntityType.IDENTIFICATION_TYPE, identificationTypeService);
        crudServices.put(EntityType.USER_IDENTIFICATION, userIdentificationService);
        crudServices.put(EntityType.ROLE, roleService);
    }

    /**
     * Crea y retorna un servicio CRUD para el tipo de entidad especificado.
     *
     * @param entityType El tipo de entidad para el cual se requiere el servicio
     * @param <T> El tipo del DTO
     * @return El servicio CRUD correspondiente
     * @throws FactoryException si no hay servicio registrado para el entityType
     */
    @SuppressWarnings("unchecked")
    @Override
    public <T, ID> CrudOperations<T, ID> createCrudService(EntityType entityType) {
        CrudOperations<?, ?> service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException("No CRUD service registered for entity: " + entityType);
        }
        return (CrudOperations<T, ID>) service;
    }

    /**
     * Crea y retorna un servicio especializado que implementa la interfaz especificada.
     *
     * @param entityType El tipo de entidad
     * @param serviceInterface La interfaz que debe implementar el servicio
     * @param <T> El tipo de la interfaz del servicio
     * @return El servicio que implementa la interfaz especificada
     * @throws FactoryException si no hay servicio registrado o no implementa la interfaz
     */
    @SuppressWarnings("unchecked")
    @Override
    public <T> T createSpecializedService(EntityType entityType, Class<T> serviceInterface) {
        CrudOperations<?, ?> service = crudServices.get(entityType);
        if (service == null) {
            throw new FactoryException("No service registered for entity: " + entityType);
        }

        if (!serviceInterface.isInstance(service)) {
            throw new FactoryException("Service " + entityType + " does not implement " + serviceInterface.getSimpleName());
        }

        return (T) service;
    }

    @Override
    public <T, ID> CrudOperations<T, ID> getService(EntityType type, Class<T> dtoClass) {
        return createCrudService(type);
    }

    /**
     * Verifica si hay un servicio registrado para el tipo de entidad especificado.
     *
     * @param entityType El tipo de entidad a verificar
     * @return true si hay un servicio registrado, false en caso contrario
     */
    @Override
    public boolean supports(EntityType entityType) {
        return crudServices.containsKey(entityType);
    }
}
