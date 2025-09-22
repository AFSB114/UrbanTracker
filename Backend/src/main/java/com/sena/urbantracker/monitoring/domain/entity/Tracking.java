package com.sena.urbantracker.monitoring.domain.entity;


import com.sena.urbantracker.monitoring.domain.valueobject.DataSourceType;
import com.sena.urbantracker.routes.domain.entity.RouteTrajectory;
import com.sena.urbantracker.vehicles.domain.entity.Vehicle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tracking", schema = "monitoring")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trajectory_id", nullable = false)
    private RouteTrajectory trajectory;

    @Column(nullable = false)
    private OffsetDateTime timestamp;

    @Column(nullable = false, precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 11, scale = 8)
    private BigDecimal  longitude;

    @Column(name = "data_source", length = 20)
    @Enumerated(EnumType.STRING)
    private DataSourceType dataSource;
}
