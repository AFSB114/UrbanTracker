package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.application.dto.BaseRouteDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Builder
public class RouteResDto extends BaseRouteDto {
    @NotBlank(message = "El ID es obligatorio")
    @Positive(message = "El ID debe ser positivo")
    private Long id;
}
