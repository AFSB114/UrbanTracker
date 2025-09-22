package com.sena.urbantracker.shared.infrastructure.exception;

public class EntityInactiveException extends RuntimeException {

  public EntityInactiveException(String entityType, Long id) {
    super(String.format("%s with ID %d is inactive", entityType, id));
  }

  public EntityInactiveException(String message) {
    super(message);
  }
}
