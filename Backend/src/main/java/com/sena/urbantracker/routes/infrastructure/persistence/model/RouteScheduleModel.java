package com.sena.urbantracker.routes.infrastructure.persistence.model;

import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;
import com.sena.urbantracker.shared.application.dto.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import java.sql.Time;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "route_schedule", schema = "routes")
public class RouteScheduleModel extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private RouteModel route;

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek;

    @Column(name = "start_time", nullable = false)
    private Time startTime;

    @Column(name = "end_time", nullable = false)
    private Time endTime;
}