package com.sena.urbantracker.routes.application.dto;

import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseRouteDto {
    @NotBlank(message = "El número de ruta es obligatorio")
    @Size(min = 1, max = 50, message = "El número de ruta debe tener entre 1 y 50 caracteres")
    private String numberRoute;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @NotBlank(message = "La distancia total es obligatoria")
    private Double totalDistance;

    @NotBlank(message = "Los puntos de ruta son obligatorios")
    private RouteWaypointReqDto waypoint;
}

