package com.sena.urbantracker.shared.model.dto;

import com.sena.urbantracker.shared.model.enums.OperationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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

    /**
     * Crea una respuesta exitosa con datos y mensaje personalizado
     */
    public static <T> CrudResponseDto<T> success(T data, OperationType operation,
                                                 String entityType, String customMessage) {
        return CrudResponseDto.<T>builder()
                .success(true)
                .data(data)
                .operation(operation)
                .entityType(entityType)
                .timestamp(LocalDateTime.now())
                .message(customMessage)
                .build();
    }

    /**
     * Crea una respuesta de error con mensaje
     */
    public static <T> CrudResponseDto<T> error(String message, OperationType operation, String entityType) {
        return CrudResponseDto.<T>builder()
                .success(false)
                .message(message)
                .operation(operation)
                .entityType(entityType)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Crea una respuesta de error con errores de validación
     */
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


    // ========== MÉTODOS HELPER PRIVADOS ==========

    private static String generateSuccessMessage(OperationType operation, String entityType) {
        return switch (operation) {
            case CREATE -> entityType + " created successfully";
            case READ -> entityType + " retrieved successfully";
            case UPDATE -> entityType + " updated successfully";
            case DELETE -> entityType + " deleted successfully";
            case ACTIVATE -> entityType + " activated successfully";
            case DEACTIVATE -> entityType + " deactivated successfully";
            default -> "Operation completed successfully";
        };
    }
}
