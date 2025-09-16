package com.sena.urbantracker.routes.model.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Abstract base class for route-related request DTOs.
 * Provides common validation and structure for route request objects.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseRouteReqDto {

    @NotBlank(message = "El número de ruta es obligatorio")
    @Size(min = 1, max = 50, message = "El número de ruta debe tener entre 1 y 50 caracteres")
    private String numberRoute;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @NotBlank(message = "La distancia total es obligatoria")
    private Double totalDistance;
}