package com.sena.urbantracker.routes.model.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for creating or updating a route waypoint.
 * Extends BaseRouteWaypointReqDto and includes route reference.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class RouteWaypointReqDto extends BaseRouteWaypointReqDto {

    @NotNull(message = "El ID de la ruta es obligatorio")
    private Long routeId;

    // Inherits sequence, latitude, longitude from BaseRouteWaypointReqDto
}
