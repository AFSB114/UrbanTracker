package com.sena.urbantracker.routes.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteAssignmentReqDto extends ABaseReqDto {

    @NotNull(message = "El ID de la ruta es obligatorio")
    private Long routeId;

    @NotNull(message = "El ID del vehículo es obligatorio")
    private Long vehicleId;

    @NotNull(message = "El estado de asignación es obligatorio")
    private AssigmentStatusType assignmentStatus;

    private String note;
}