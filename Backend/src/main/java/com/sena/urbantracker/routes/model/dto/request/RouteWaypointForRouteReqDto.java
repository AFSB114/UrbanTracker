package com.sena.urbantracker.routes.model.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * DTO for route waypoints when used within RouteWithWaypointsReqDto.
 * This DTO doesn't include the route reference to avoid circular dependencies.
 */
@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class RouteWaypointForRouteReqDto extends BaseRouteWaypointReqDto {

    // Inherits sequence, latitude, longitude from BaseRouteWaypointReqDto
    // No route reference to avoid circular dependency in RouteWithWaypointsReqDto
}