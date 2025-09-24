package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.routes.domain.valueobject.TrajectoryStatusType;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteTrajectoryDomain extends ABaseDomain {
    private RouteDomain route;
    private VehicleDomain vehicle;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private TrajectoryStatusType trajectoryStatus;
}