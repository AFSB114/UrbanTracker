package com.sena.urbantracker.shared.model.dto;

import com.sena.urbantracker.shared.model.enums.OperationType;
import com.sena.urbantracker.vehicles.model.dto.response.VehicleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CrudResponseDto<T> {

    private boolean success;
    private String message;
    private T data;
    private OperationType operation;
    private String entityType;
    private LocalDateTime timestamp;
    private List<String> validationErrors;

    /* ========= FACTORY METHODS ========= */

    public static <T> CrudResponseDto<T> success(T data, OperationType operation, String entityType) {
        return CrudResponseDto.<T>builder()
                .success(true)
                .data(data)
                .operation(operation)
                .entityType(entityType)
                .timestamp(LocalDateTime.now())
                .message(generateSuccessMessage(operation, entityType))
                .build();
    }

    public static <T> CrudResponseDto<T> success(T data, String customMessage) {
        return CrudResponseDto.<T>builder()
                .success(true)
                .data(data)
                .operation(null)
                .entityType(null)
                .timestamp(LocalDateTime.now())
                .message(customMessage)
                .build();
    }

    public static <T> CrudResponseDto<T> error(String message, OperationType operation, String entityType) {
        return CrudResponseDto.<T>builder()
                .success(false)
                .message(message)
                .operation(operation)
                .entityType(entityType)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> CrudResponseDto<T> validationError(List<String> validationErrors,
                                                         OperationType operation, String entityType) {
        return CrudResponseDto.<T>builder()
                .success(false)
                .message("Validation failed")
                .validationErrors(validationErrors)
                .operation(operation)
                .entityType(entityType)
                .timestamp(LocalDateTime.now())
                .build();
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
