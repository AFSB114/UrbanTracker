package com.sena.urbantracker.shared.application.dto;

import com.sena.urbantracker.shared.domain.enums.OperationType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CrudResponseDto<T> {

    @NotNull(message = "El campo success no puede ser nulo")
    public boolean success;

    public String message;
    public T data;
    public OperationType operation;
    public String entityType;

    @NotNull(message = "El timestamp no puede ser nulo")
    public LocalDateTime timestamp;

    public List<String> validationErrors;

    /* ========= FACTORY METHODS ========= */

    public static <T> CrudResponseDto<T> success(T data, OperationType operation, String entityType) {
        CrudResponseDto<T> response = new CrudResponseDto<>();
        response.setSuccess(true);
        response.setData(data);
        response.setOperation(operation);
        response.setEntityType(entityType);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(generateSuccessMessage(operation, entityType));
        return response;
    }

    public static <T> CrudResponseDto<T> success(T data, String customMessage) {
        CrudResponseDto<T> response = new CrudResponseDto<>();
        response.setSuccess(true);
        response.setData(data);
        response.setOperation(null);
        response.setEntityType(null);
        response.setTimestamp(LocalDateTime.now());
        response.setMessage(customMessage);
        return response;
    }

    public static <T> CrudResponseDto<T> error(String message, OperationType operation, String entityType) {
        CrudResponseDto<T> response = new CrudResponseDto<>();
        response.setSuccess(false);
        response.setMessage(message);
        response.setOperation(operation);
        response.setEntityType(entityType);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }

    public static <T> CrudResponseDto<T> validationError(List<String> validationErrors,
                                                          OperationType operation, String entityType) {
        CrudResponseDto<T> response = new CrudResponseDto<>();
        response.setSuccess(false);
        response.setMessage("Validation failed");
        response.setValidationErrors(validationErrors);
        response.setOperation(operation);
        response.setEntityType(entityType);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }


    private static String generateSuccessMessage(OperationType operation, String entityType) {
        if (operation == null || entityType == null) return "Operation successful";

        return switch (operation) {
            case CREATE -> entityType + " creado correctamente";
            case READ -> entityType + " encontrado";
            case UPDATE -> entityType + " actualizado correctamente";
            case DELETE -> entityType + " eliminado correctamente";
            default -> "Operación completada";
        };
    }
}
