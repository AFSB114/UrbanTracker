package com.sena.urbantracker.vehicles.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleTypeDomain extends ABaseDomain {
    private String name;
    private String description;
}