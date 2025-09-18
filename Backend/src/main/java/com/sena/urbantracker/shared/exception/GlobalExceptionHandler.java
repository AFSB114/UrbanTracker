package com.sena.urbantracker.shared.exception;

import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.OperationType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<CrudResponseDto<Object>> handleEntityNotFound(EntityNotFoundException ex) {
        log.warn("Entity not found: {}", ex.getMessage());

        CrudResponseDto<Object> response = CrudResponseDto.error(
                ex.getMessage(),
                OperationType.READ,
                "Entity"
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * Maneja EntityAlreadyExistsException - 409 Conflict
     */
    @ExceptionHandler(EntityAlreadyExistsException.class)
    public ResponseEntity<CrudResponseDto<Object>> handleEntityAlreadyExists(EntityAlreadyExistsException ex) {
        log.warn("Entity already exists: {}", ex.getMessage());

        CrudResponseDto<Object> response = CrudResponseDto.error(
                ex.getMessage(),
                OperationType.CREATE,
                "Entity"
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    /**
     * Maneja EntityInactiveException - 422 Unprocessable Entity
     */
    @ExceptionHandler(EntityInactiveException.class)
    public ResponseEntity<CrudResponseDto<Object>> handleEntityInactive(EntityInactiveException ex) {
        log.warn("Entity inactive: {}", ex.getMessage());

        CrudResponseDto<Object> response = CrudResponseDto.error(
                ex.getMessage(),
                OperationType.UPDATE,
                "Entity"
        );

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
    }

    /**
     * Maneja ValidationException - 400 Bad Request
     */
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<CrudResponseDto<Object>> handleValidation(ValidationException ex) {
        log.warn("Validation error: {}", ex.getMessage());

        CrudResponseDto<Object> response;

        if (ex.getValidationErrors() != null && !ex.getValidationErrors().isEmpty()) {
            response = CrudResponseDto.validationError(
                    ex.getValidationErrors(),
                    OperationType.CREATE,
                    "Entity"
            );
        } else {
            response = CrudResponseDto.error(
                    ex.getMessage(),
                    OperationType.CREATE,
                    "Entity"
            );
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Maneja FactoryException - 500 Internal Server Error
     */
    @ExceptionHandler(FactoryException.class)
    public ResponseEntity<CrudResponseDto<Object>> handleFactory(FactoryException ex) {
        log.error("Factory error: {}", ex.getMessage(), ex);

        CrudResponseDto<Object> response = CrudResponseDto.error(
                ex.getMessage(),  // mensaje real
                ex.getOperation() != null ? OperationType.valueOf(ex.getOperation()) : null,
                ex.getEntityType() != null ? ex.getEntityType().name() : "System"
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }


    /**
     * Maneja UnauthorizedException - 401 Unauthorized
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<CrudResponseDto<Object>> handleUnauthorized(UnauthorizedException ex) {
        log.warn("Unauthorized access: {}", ex.getMessage());

        CrudResponseDto<Object> response = CrudResponseDto.error(
                ex.getMessage(),
                null,
                "Security"
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CrudResponseDto<Object>> handleGeneral(Exception ex) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);

        CrudResponseDto<Object> response = CrudResponseDto.error(
                "An unexpected error occurred",
                null,
                "System"
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
