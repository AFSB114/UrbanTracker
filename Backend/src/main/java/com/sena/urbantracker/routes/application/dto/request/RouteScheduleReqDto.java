package com.sena.urbantracker.routes.application.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;
import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Time;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteScheduleReqDto extends ABaseReqDto {
    private Long routeId;
    private String dayOfWeek;
    @JsonFormat(pattern = "HH:mm:ss")
    private Time startTime;
    @JsonFormat(pattern = "HH:mm:ss")
    private Time endTime;
}