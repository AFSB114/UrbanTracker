package com.sena.urbantracker.vehicles.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleAssignmentDomain extends ABaseDomain {
    private Long vehicleId; // Reference to Vehicle
    private Long driverId; // Reference to Driver
    private AssigmentStatusType assignmentStatus;
    private String note;
}