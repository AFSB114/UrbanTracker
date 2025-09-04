package com.sena.urbantracker.shared.controller;

import com.sena.urbantracker.shared.exception.ValidationException;
import com.sena.urbantracker.shared.model.dto.BaseDto;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.EntityType;
import com.sena.urbantracker.shared.repository.ActivableEntity;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.shared.service.ServiceFactory;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

public abstract class BaseController<T extends BaseDto, ID> {

    protected ServiceFactory serviceFactory;

    protected abstract EntityType getEntityType();
    protected abstract Class<T> getDtoClass();

    @PostMapping
    public ResponseEntity<CrudResponseDto<T>> create(@Valid @RequestBody T dto) {
        CrudOperations<T, ID> service = serviceFactory.createCrudService(getEntityType());
        CrudResponseDto<T> response = service.create(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CrudResponseDto<Optional<T>>> findById(@PathVariable ID id) {
        CrudOperations<T, ID> service = serviceFactory.createCrudService(getEntityType());
        CrudResponseDto<Optional<T>> response = service.findById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<CrudResponseDto<List<T>>> findAll() {
        CrudOperations<T, ID> service = serviceFactory.createCrudService(getEntityType());
        CrudResponseDto<List<T>> response = service.findAll();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CrudResponseDto<T>> update(@PathVariable ID id, @Valid @RequestBody T dto) {
        if (id == null) {
            throw new ValidationException("ID cannot be null");
        }

        dto.setId((Long) id);

        CrudOperations<T, ID> service = serviceFactory.createCrudService(getEntityType());
        CrudResponseDto<T> response = service.update(dto);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CrudResponseDto<Void>> delete(@PathVariable ID id) {
        CrudOperations<T, ID> service = serviceFactory.createCrudService(getEntityType());
        CrudResponseDto<Void> response = service.deleteById(id);

        return ResponseEntity.ok(response);
    }


    @PatchMapping("/{id}/activate")
    public ResponseEntity<CrudResponseDto<T>> activate(@PathVariable ID id) {
        ActivableEntity<T> service = serviceFactory.createActivableService(getEntityType());
        CrudResponseDto<T> response = service.activate();

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<CrudResponseDto<T>> deactivate(@PathVariable ID id) {
        ActivableEntity<T> service = serviceFactory.createActivableService(getEntityType());
        CrudResponseDto<T> response = service.deactivate();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    public ResponseEntity<CrudResponseDto<List<T>>> findAllActive() {
        ActivableEntity<T> service = serviceFactory.createActivableService(getEntityType());
        CrudResponseDto<List<T>> response = service.findAllActive();

        return ResponseEntity.ok(response);
    }
}


