package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteAssignmentDomain extends ABaseDomain {
    private RouteDomain route;
    private VehicleDomain vehicle;
    private AssigmentStatusType assignmentStatus;
    private String note;
}