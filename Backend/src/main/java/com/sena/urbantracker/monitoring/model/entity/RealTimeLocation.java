package com.sena.urbantracker.monitoring.model.entity;

import com.sena.urbantracker.routes.model.entity.RouteTrajectory;
import com.sena.urbantracker.vehicles.model.entity.Vehicle;
import com.sena.urbantracker.monitoring.model.enums.DataSourceType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "real_time_location", schema = "monitoring")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RealTimeLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "trajectory_id", nullable = false)
    private RouteTrajectory trajectory;

    @Column(nullable = false)
    private OffsetDateTime timestamp;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(name = "data_source", length = 20)
    @Enumerated(EnumType.STRING)
    private DataSourceType dataSource;
}
