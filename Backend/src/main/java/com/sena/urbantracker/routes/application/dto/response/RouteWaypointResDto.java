package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.domain.valueobject.WaypointDestineType;
import com.sena.urbantracker.routes.domain.valueobject.WaypointType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class RouteWaypointResDto {
    @NotNull(message = "El ID es obligatorio")
    private Long id;

    @NotNull(message = "La secuencia es obligatoria")
    private Integer sequence;

    @NotNull(message = "La latitud es obligatoria")
    @DecimalMin(value = "-90.0", message = "La latitud debe estar entre -90 y 90")
    @DecimalMax(value = "90.0", message = "La latitud debe estar entre -90 y 90")
    private Double latitude;

    @NotNull(message = "La longitud es obligatoria")
    @DecimalMin(value = "-180.0", message = "La longitud debe estar entre -180 y 180")
    @DecimalMax(value = "180.0", message = "La longitud debe estar entre -180 y 180")
    private Double longitude;

    @NotNull(message = "El tipo es obligatorio")
    private WaypointType type;

    @NotNull(message = "El destino es obligatorio")
    private WaypointDestineType destine;
}
