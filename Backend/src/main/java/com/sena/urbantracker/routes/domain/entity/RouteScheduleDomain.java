package com.sena.urbantracker.routes.domain.entity;

import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Time;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteScheduleDomain extends ABaseDomain {
    private RouteDomain route;
    private String dayOfWeek;
    private Time startTime;
    private Time endTime;
}