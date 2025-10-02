package com.sena.urbantracker.monitoring.infrastructure.persistence.model;


import com.sena.urbantracker.monitoring.domain.valueobject.DataSourceType;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteModel;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
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
public class TrackingModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = false)
    private RouteModel route;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleModel vehicle;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "trajectory_id", nullable = false)
//    private RouteTrajectory trajectory;

    @Column(nullable = false)
    private OffsetDateTime timestamp;

    @Column(nullable = false, precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 11, scale = 8)
    private BigDecimal  longitude;

    @Column(name = "data_source", length = 20)
    private DataSourceType dataSource;
}