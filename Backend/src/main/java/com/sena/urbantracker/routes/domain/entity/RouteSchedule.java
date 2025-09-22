package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Time;
import java.time.LocalDateTime;

@Entity
@Table(name = "route_schedule", schema = "routes")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RouteSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    @Column(name = "day_of_week", nullable = false)
    @Enumerated(EnumType.STRING)
    private DayOfWeekType dayOfWeek;

    @Column(name = "start_time", nullable = false)
    private Time startTime;

    @Column(name = "end_time", nullable = false)
    private Time endTime;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
