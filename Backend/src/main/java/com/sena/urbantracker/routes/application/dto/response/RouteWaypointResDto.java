package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.application.dto.BaseRouteWaypointDto;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class RouteWaypointResDto extends BaseRouteWaypointDto {
    @NotBlank(message = "El ID es obligatorio")
    @Positive(message = "El ID debe ser positivo")
    private Long id;
}
