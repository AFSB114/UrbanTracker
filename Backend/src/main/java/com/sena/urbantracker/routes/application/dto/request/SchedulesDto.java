package com.sena.urbantracker.routes.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchedulesDto {
    private List<RouteScheduleReqDto> schedules;
}
