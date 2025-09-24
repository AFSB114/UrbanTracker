package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.domain.valueobject.TrajectoryStatusType;
import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteTrajectoryResDto extends ABaseResDto {
    private Long routeId;
    private Long vehicleId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private TrajectoryStatusType trajectoryStatus;
}