package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "route_waypoint",
        schema = "routes",
        uniqueConstraints = @UniqueConstraint(columnNames = {"route_id", "sequence"}),
        indexes = @Index(columnList = "route_id"))
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RouteWaypoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    @Column(nullable = false)
    private Integer sequence;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private WaypointType type;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
