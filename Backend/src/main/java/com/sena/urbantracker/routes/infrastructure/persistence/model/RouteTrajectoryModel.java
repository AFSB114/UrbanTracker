package com.sena.urbantracker.routes.infrastructure.persistence.model;

import com.sena.urbantracker.routes.domain.valueobject.TrajectoryStatusType;
import com.sena.urbantracker.shared.application.dto.BaseEntity;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "route_trajectory", schema = "routes")
public class RouteTrajectoryModel extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private RouteModel route;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleModel vehicle;

    @Column(name = "start_time", nullable = false)
    @Builder.Default
    private LocalDateTime startTime = LocalDateTime.now();

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "trajectory_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TrajectoryStatusType trajectoryStatus;
}