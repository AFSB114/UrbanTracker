package com.sena.urbantracker.routes.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;
import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Time;
import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteScheduleResDto extends ABaseResDto {
    private Long routeId;
    private String dayOfWeek;
    @JsonFormat(pattern = "HH:mm:ss")
    private Time startTime;
    @JsonFormat(pattern = "HH:mm:ss")
    private Time endTime;
}