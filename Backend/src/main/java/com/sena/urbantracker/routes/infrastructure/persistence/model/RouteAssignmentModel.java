package com.sena.urbantracker.routes.infrastructure.persistence.model;

import com.sena.urbantracker.shared.application.dto.BaseEntity;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "route_assignment", schema = "routes")
public class RouteAssignmentModel extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private RouteModel route;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleModel vehicle;

    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private AssigmentStatusType assignmentStatus;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;
}