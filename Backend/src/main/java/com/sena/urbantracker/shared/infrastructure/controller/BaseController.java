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
 * Las subclases deben proporcionar los tipos de DTO de request/response en el constructor.
 *
 * @param <DReq> El tipo del DTO de request que extiende BaseDto
 * @param <DRes> El tipo del DTO de response que extiende BaseDto
 * @param <ID> El tipo del identificador (generalmente Long)
 */
@Slf4j
public abstract class BaseController<DReq , DRes , ID> {

    protected final ServiceFactory serviceFactory;
    protected final EntityType entityType;
    protected final Class<DReq> requestDtoClass;
    protected final Class<DRes> responseDtoClass;

    public BaseController(ServiceFactory serviceFactory, EntityType entityType,
                         Class<DReq> requestDtoClass, Class<DRes> responseDtoClass) {
        this.serviceFactory = serviceFactory;
        this.entityType = entityType;
        this.requestDtoClass = requestDtoClass;
        this.responseDtoClass = responseDtoClass;
    }

    /**
     * Obtiene el servicio CRUD correspondiente al entityType de este controlador.
     * Utiliza el ServiceFactory para crear o recuperar el servicio apropiado.
     *
     * @return El servicio CRUD para este controlador
     */
<<<<<<< HEAD
     protected CrudOperations<DReq, DRes, ID> getService() {
         return serviceFactory.getService(entityType, requestDtoClass);
=======
     protected CrudOperations<T, T, ID> getService() {
         return serviceFactory.getService(entityType, getDtoClass());
>>>>>>> f252bb3a6785026041a2d2e63fe8ac835006ca26
     }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
<<<<<<< HEAD
    public ResponseEntity<CrudResponseDto<DRes>> create(@Valid @RequestBody DReq dto) {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<DRes> response = service.create(dto);
=======
    public ResponseEntity<CrudResponseDto<T>> create(@Valid @RequestBody T dto) {
        CrudOperations<T, T, ID> service = getService();
        CrudResponseDto<T> response = service.create(dto);
>>>>>>> f252bb3a6785026041a2d2e63fe8ac835006ca26
        log.info("Response: {}", response);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<CrudResponseDto<Optional<DRes>>> findById(@PathVariable ID id) {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<Optional<DRes>> response = service.findById(id);
=======
    public ResponseEntity<CrudResponseDto<Optional<T>>> findById(@PathVariable ID id) {
        CrudOperations<T, T, ID> service = getService();
        CrudResponseDto<Optional<T>> response = service.findById(id);
>>>>>>> f252bb3a6785026041a2d2e63fe8ac835006ca26

        return ResponseEntity.ok(response);
    }

    @GetMapping
<<<<<<< HEAD
    public ResponseEntity<CrudResponseDto<List<DRes>>> findAll() {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<List<DRes>> response = service.findAll();
=======
    public ResponseEntity<CrudResponseDto<List<T>>> findAll() {
        CrudOperations<T, T, ID> service = getService();
        CrudResponseDto<List<T>> response = service.findAll();
>>>>>>> f252bb3a6785026041a2d2e63fe8ac835006ca26

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CrudResponseDto<DRes>> update(@PathVariable ID id, @Valid @RequestBody DReq dto) {
        if (id == null) {
            throw new ValidationException("ID cannot be null");
        }

        // Asumimos que el DTO tiene un método setId que acepta Long
//        (dto).setId((Long) id);

<<<<<<< HEAD
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<DRes> response = service.update(dto, id);
=======
        CrudOperations<T, T, ID> service = getService();
        CrudResponseDto<T> response = service.update(dto);
>>>>>>> f252bb3a6785026041a2d2e63fe8ac835006ca26

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<CrudResponseDto<DRes>> delete(@PathVariable ID id) {
        CrudOperations<DReq, DRes, ID> service = getService();
        CrudResponseDto<DRes> response = service.deleteById(id);
=======
    public ResponseEntity<CrudResponseDto<T>> delete(@PathVariable ID id) {
        CrudOperations<T, T, ID> service = getService();
        CrudResponseDto<T> response = service.deleteById(id);
>>>>>>> f252bb3a6785026041a2d2e63fe8ac835006ca26

        return ResponseEntity.ok(response);
    }


}
