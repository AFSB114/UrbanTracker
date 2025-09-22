package com.sena.urbantracker.routes.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "route", schema = "routes")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number_route",nullable = false, unique = true)
    private Integer numberRoute;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "total_distance")
    private Double totalDistance;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RouteWaypoint> routeWaypoints;
}
