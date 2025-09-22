package com.sena.urbantracker.shared.infrastructure.exception;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String entityType, String field, Object value) {
        super(String.format("%s with %s '%s' already exists", entityType, field, value));
    }

    public EntityAlreadyExistsException(String message) {
        super(message);
    }
}
