package com.sena.urbantracker.routes.application.dto.request;

import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.DecimalMax;

/**
 * Abstract base class for route waypoint request DTOs.
 * Provides common validation and structure for waypoint request objects.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseRouteWaypointReqDto {

    @NotNull(message = "La secuencia es obligatoria")
    private Integer sequence;

    @NotNull(message = "La latitud es obligatoria")
    @DecimalMin(value = "-90.0", message = "La latitud debe estar entre -90 y 90")
    @DecimalMax(value = "90.0", message = "La latitud debe estar entre -90 y 90")
    private Double latitude;

    @NotNull(message = "La longitud es obligatoria")
    @DecimalMin(value = "-180.0", message = "La longitud debe estar entre -180 y 180")
    @DecimalMax(value = "180.0", message = "La longitud debe estar entre -180 y 180")
    private Double longitude;

    @NotNull(message = "El tipo es obligatorio")
    private WaypointType type;
}
