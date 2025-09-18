package com.sena.urbantracker.shared.exception;

import com.sena.urbantracker.shared.model.enums.EntityType;
import lombok.Getter;

@Getter
public class FactoryException extends RuntimeException {

    private final EntityType entityType;
    private final String operation;

    public FactoryException(String message, EntityType entityType, String operation) {
        super(message);
        this.entityType = entityType;
        this.operation = operation;
    }

    public FactoryException(String message, EntityType entityType) {
        this(message, entityType, null);
    }

    public FactoryException(String message) {
        this(message, null, null);
    }

}
