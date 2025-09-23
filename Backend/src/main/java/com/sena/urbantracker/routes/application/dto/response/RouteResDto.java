package com.sena.urbantracker.routes.application.dto.response;

import com.sena.urbantracker.routes.application.dto.BaseRouteDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@Builder
public class RouteResDto extends BaseRouteDto {
    @NotBlank(message = "El ID es obligatorio")
    @Positive(message = "El ID debe ser positivo")
    private Long id;
}
