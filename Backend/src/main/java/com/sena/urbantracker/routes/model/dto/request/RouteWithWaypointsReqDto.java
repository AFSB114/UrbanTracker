package com.sena.urbantracker.routes.model.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * Request DTO for creating or updating a route with its waypoints.
 * Uses RouteWaypointForRouteReqDto to avoid circular dependencies.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class RouteWithWaypointsReqDto extends BaseRouteReqDto {

    @NotNull(message = "La distancia total es obligatoria")
    private Double totalDistance;

    @NotEmpty(message = "Debe incluir al menos un punto de ruta")
    @Valid
    private List<RouteWaypointForRouteReqDto> waypoints;

    // Inherits numberRoute and description from BaseRouteReqDto
}
