package com.sena.urbantracker.vehicles.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import com.sena.urbantracker.vehicles.domain.valueobject.VehicleStatusType;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleDomain extends ABaseDomain {
    private Long companyId; // Reference to Company
    private Long vehicleTypeId; // Reference to VehicleType
    private String licencePlate;
    private String brand;
    private String model;
    private Integer year;
    private String color;
    private Integer passengerCapacity;
    private VehicleStatusType status;
    private boolean inService;
}