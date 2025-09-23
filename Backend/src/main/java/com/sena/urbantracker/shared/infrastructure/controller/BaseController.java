package com.sena.urbantracker.shared.infrastructure.controller;

import com.sena.urbantracker.shared.infrastructure.exception.ValidationException;
import com.sena.urbantracker.shared.domain.dto.BaseDto;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

/**
 * Controlador base genérico que proporciona operaciones CRUD comunes.
 * Utiliza el patrón Factory para obtener servicios específicos basados en EntityType.
 * Las subclases deben proporcionar los tipos de DTO de request/response y la lógica específica.
 *
 * @param <DReq> El tipo del DTO de request que extiende BaseDto
 * @param <DRes> El tipo del DTO de response que extiende BaseDto
 * @param <ID> El tipo del identificador (generalmente Long)
 */
@Slf4j
public abstract class BaseController<DReq extends BaseDto, DRes extends BaseDto, ID> {

    protected final ServiceFactory serviceFactory;

    protected final EntityType entityType;

    public BaseController(ServiceFactory serviceFactory, EntityType entityType) {
        this.serviceFactory = serviceFactory;
        this.entityType = entityType;
    }

    /**
     * Retorna la clase del DTO de request utilizado por este controlador.
     * Las subclases deben implementar este método para especificar su tipo de DTO de request.
     *
     * @return La clase del DTO de request
     */
    protected abstract Class<DReq> getRequestDtoClass();

    /**
     * Retorna la clase del DTO de response utilizado por este controlador.
     * Las subclases deben implementar este método para especificar su tipo de DTO de response.
     *
     * @return La clase del DTO de response
     */
    protected abstract Class<DRes> getResponseDtoClass();

    /**
     * Obtiene el servicio CRUD correspondiente al entityType de este controlador.
     * Utiliza el ServiceFactory para crear o recuperar el servicio apropiado.
     *
     * @return El servicio CRUD para este controlador
     */
     protected CrudOperations<DReq, DRes, ID> getService() {
         return serviceFactory.getService(entityType, getRequestDtoClass());
     }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrudResponseDto<DRes>> create(@Valid @RequestBody DReq dto) {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<DRes> response = service.create(dto);
        log.info("Response: {}", response);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CrudResponseDto<Optional<DRes>>> findById(@PathVariable ID id) {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<Optional<DRes>> response = service.findById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<CrudResponseDto<List<DRes>>> findAll() {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<List<DRes>> response = service.findAll();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CrudResponseDto<DRes>> update(@PathVariable ID id, @Valid @RequestBody DReq dto) {
        if (id == null) {
            throw new ValidationException("ID cannot be null");
        }

        // Asumimos que el DTO tiene un método setId que acepta Long
        (dto).setId((Long) id);

        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<DRes> response = service.update(dto, id);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CrudResponseDto<DRes>> delete(@PathVariable ID id) {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<DRes> response = service.deleteById(id);

        return ResponseEntity.ok(response);
    }


}
