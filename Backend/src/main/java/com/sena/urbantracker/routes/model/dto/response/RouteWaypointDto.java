package com.sena.urbantracker.routes.model.dto.response;

import com.sena.urbantracker.routes.model.enums.WaypointType;
import com.sena.urbantracker.shared.model.dto.BaseDto;
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