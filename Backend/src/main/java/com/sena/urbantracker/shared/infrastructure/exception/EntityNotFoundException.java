package com.sena.urbantracker.shared.infrastructure.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityType, Long id) {
        super(String.format("%s with ID %d not found", entityType, id));
    }

    public EntityNotFoundException(String entityType, String field, Object value) {
        super(String.format("%s with %s '%s' not found", entityType, field, value));
    }

    public EntityNotFoundException(String message) {
        super(message);
    }
}
