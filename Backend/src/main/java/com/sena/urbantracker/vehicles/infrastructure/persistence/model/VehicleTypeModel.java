package com.sena.urbantracker.vehicles.infrastructure.persistence.model;

import com.sena.urbantracker.shared.application.dto.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "vehicle_types", schema = "vehicles")
public class VehicleTypeModel extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(length = 200)
    private String description;
}