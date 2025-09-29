package com.sena.urbantracker.shared.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDetailsResDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.shared.infrastructure.exception.ValidationException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;

/**
 * Controlador base genérico que proporciona operaciones CRUD comunes.
 * Utiliza el patrón Factory para obtener servicios específicos basados en EntityType.
 * Las subclases deben proporcionar los tipos de DTO de request/response en el constructor.
 *
 * @param <DReq> El tipo del DTO de request que extiende BaseDto
 * @param <DRes> El tipo del DTO de response que extiende BaseDto
 * @param <ID>   El tipo del identificador (generalmente Long)
 */
@Slf4j
public abstract class BaseController<DReq, DRes, ID> {

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
    protected CrudOperations<DReq, DRes, ID> getService() {
        return serviceFactory.getService(entityType, requestDtoClass);
    }

    @PostMapping
    public ResponseEntity<CrudResponseDto<DRes>> create(@Valid @RequestBody DReq dto) throws BadRequestException {
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
    public ResponseEntity<CrudResponseDto<DRes>> update(@PathVariable ID id, @Valid @RequestBody DReq dto) throws BadRequestException {
        if (id == null) {
            throw new ValidationException("ID cannot be null");
        }

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

    protected ResponseEntity<CrudResponseDto<Optional<DRes>>> findByIdToMap(ID id) {

        return  null;
    }
}
