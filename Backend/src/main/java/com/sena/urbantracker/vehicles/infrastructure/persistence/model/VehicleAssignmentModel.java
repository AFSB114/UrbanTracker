package com.sena.urbantracker.vehicles.infrastructure.persistence.model;

import com.sena.urbantracker.shared.application.dto.BaseEntity;
import com.sena.urbantracker.users.infrastructure.persistence.model.DriverModel;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "vehicle_assignment", schema = "vehicles")
public class VehicleAssignmentModel extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleModel vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private DriverModel driver;

    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private AssigmentStatusType assignmentStatus;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;
}