package com.sena.urbantracker.routes.application.dto.request;

import com.sena.urbantracker.routes.domain.valueobject.TrajectoryStatusType;
import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteTrajectoryReqDto extends ABaseReqDto {
    private Long routeId;
    private Long vehicleId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private TrajectoryStatusType trajectoryStatus;
}