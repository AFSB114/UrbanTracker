package com.sena.urbantracker.shared.exception;

import lombok.Getter;

import java.util.List;

@Getter
public class ValidationException extends RuntimeException {

  private final List<String> validationErrors;

  public ValidationException(String message) {
    super(message);
    this.validationErrors = null;
  }

  public ValidationException(String message, List<String> validationErrors) {
    super(message);
    this.validationErrors = validationErrors;
  }

  public ValidationException(List<String> validationErrors) {
    super("Validation failed");
    this.validationErrors = validationErrors;
  }
}
