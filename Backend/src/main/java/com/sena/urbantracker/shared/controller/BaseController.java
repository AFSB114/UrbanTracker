package com.sena.urbantracker.shared.controller;

import com.sena.urbantracker.shared.exception.ValidationException;
import com.sena.urbantracker.shared.model.dto.BaseDto;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

/**
 * Controlador base genérico que proporciona operaciones CRUD comunes.
 * Utiliza el patrón Factory para obtener servicios específicos basados en EntityType.
 * Las subclases deben proporcionar el tipo de DTO y la lógica específica.
 *
 * @param <T> El tipo del DTO que extiende BaseDto
 * @param <ID> El tipo del identificador (generalmente Long)
 */
public abstract class BaseController<T extends BaseDto, ID> {

    protected final ServiceFactory serviceFactory;

    protected final EntityType entityType;

    public BaseController(ServiceFactory serviceFactory, EntityType entityType) {
        this.serviceFactory = serviceFactory;
        this.entityType = entityType;
    }

    /**
     * Retorna la clase del DTO utilizado por este controlador.
     * Las subclases deben implementar este método para especificar su tipo de DTO.
     *
     * @return La clase del DTO
     */
    protected abstract Class<T> getDtoClass();

    /**
     * Obtiene el servicio CRUD correspondiente al entityType de este controlador.
     * Utiliza el ServiceFactory para crear o recuperar el servicio apropiado.
     *
     * @return El servicio CRUD para este controlador
     */
     protected CrudOperations<T, ID> getService() {
         return serviceFactory.getService(entityType, getDtoClass());
     }

    @PostMapping
    public ResponseEntity<CrudResponseDto<T>> create(@Valid @RequestBody T dto) {
        CrudOperations<T, ID> service = getService();
        CrudResponseDto<T> response = service.create(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CrudResponseDto<Optional<T>>> findById(@PathVariable ID id) {
        CrudOperations<T, ID> service = getService();
        CrudResponseDto<Optional<T>> response = service.findById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<CrudResponseDto<List<T>>> findAll() {
        CrudOperations<T, ID> service = getService();
        CrudResponseDto<List<T>> response = service.findAll();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CrudResponseDto<T>> update(@PathVariable ID id, @Valid @RequestBody T dto) {
        if (id == null) {
            throw new ValidationException("ID cannot be null");
        }

        // Asumimos que el DTO tiene un método setId que acepta Long
        (dto).setId((Long) id);

        CrudOperations<T, ID> service = getService();
        CrudResponseDto<T> response = service.update(dto);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CrudResponseDto<T>> delete(@PathVariable ID id) {
        CrudOperations<T, ID> service = getService();
        CrudResponseDto<T> response = service.deleteById(id);

        return ResponseEntity.ok(response);
    }


}


