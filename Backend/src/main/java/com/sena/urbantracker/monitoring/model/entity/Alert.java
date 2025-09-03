package com.sena.urbantracker.monitoring.model.entity;

import com.sena.urbantracker.users.model.entity.Drivers;
import com.sena.urbantracker.vehicles.model.entity.Vehicle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity(name = "alerts", schema = "monitoring")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alert_id", updatable = false, nullable = false)
    private Long alertId;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    @JoinColumn(name = "driver_id", nullable = false)
    private Drivers driver;

    @Column(name = "alert_type", length = 50, nullable = false)
    private String alertType;

    @Column(length = 20, nullable = false)
    private String severity;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime timestamp;
}
