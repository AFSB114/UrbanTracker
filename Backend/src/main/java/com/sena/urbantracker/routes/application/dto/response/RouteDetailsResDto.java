package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteDetailsResDto extends ABaseResDto {
    @NotBlank(message = "El número de ruta es obligatorio")
    @Size(min = 1, max = 50, message = "El número de ruta debe tener entre 1 y 50 caracteres")
    private String numberRoute;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @NotBlank(message = "La distancia total es obligatoria")
    private Double totalDistance;

    @NotBlank(message = "Los puntos de ruta son obligatorios")
    private List<RouteWaypointResDto> waypoints;

    private String outboundImageUrl;

    private String returnImageUrl;
}
