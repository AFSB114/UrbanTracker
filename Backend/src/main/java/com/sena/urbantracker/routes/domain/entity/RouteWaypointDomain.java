package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.routes.domain.valueobject.WaypointDestineType;
import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RouteWaypointDomain {
    private Long id;
    private Long routeId;
    private Integer sequence;
    private Double latitude;
    private Double longitude;
    private WaypointType type;
    private WaypointDestineType destine;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private RouteDomain route;
}