package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.routes.domain.valueobject.WaypointDestineType;
import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteWaypointDomain extends ABaseDomain {
    private RouteDomain route;
    private Integer sequence;
    private Double latitude;
    private Double longitude;
    private String type;
    private String destine;
}