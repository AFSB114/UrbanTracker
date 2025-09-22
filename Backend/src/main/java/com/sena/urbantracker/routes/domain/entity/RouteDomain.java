package com.sena.urbantracker.routes.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RouteDomain {
    private Long id;
    private Integer numberRoute;
    private String description;
    private Double totalDistance;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<RouteWaypointDomain> routeWaypoints;
}