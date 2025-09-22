package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import com.sena.urbantracker.shared.domain.dto.BaseDto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
public class RouteWaypointDto extends BaseDto {

    private Long routeId;
    private Integer sequence;
    private Double latitude;
    private Double longitude;
    private WaypointType type;

}
