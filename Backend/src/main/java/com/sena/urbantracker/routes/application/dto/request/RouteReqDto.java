package com.sena.urbantracker.routes.application.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Request DTO for creating or updating a route without waypoints.
 * Extends BaseRouteReqDto for common validation and structure.
 */
@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class RouteReqDto extends BaseRouteReqDto {

    // Inherits numberRoute and description from BaseRouteReqDto
}
