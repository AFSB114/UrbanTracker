package com.sena.urbantracker.routes.infrastructure.persistence.model;

import com.sena.urbantracker.routes.domain.valueobject.WaypointDestineType;
import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import com.sena.urbantracker.shared.application.dto.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(
        name = "route_waypoint",
        schema = "routes",
        uniqueConstraints = @UniqueConstraint(columnNames = {"route_id", "sequence", "type", "destine"}),
        indexes = @Index(columnList = "route_id"))
public class RouteWaypointModel extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private RouteModel route;

    @Column(nullable = false)
    private Integer sequence;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String destine;
}