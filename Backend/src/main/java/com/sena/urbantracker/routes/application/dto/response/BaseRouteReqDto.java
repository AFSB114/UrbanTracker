package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.domain.entity.RouteWaypoint;
import com.sena.urbantracker.shared.domain.dto.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseRouteReqDto extends BaseDto {

    private String numberRoute;
    private String description;
    private Double totalDistance;
    private List<RouteWaypoint> routeWaypoints;

}
