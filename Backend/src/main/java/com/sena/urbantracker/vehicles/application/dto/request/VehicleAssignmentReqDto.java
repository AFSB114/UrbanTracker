package com.sena.urbantracker.vehicles.application.dto.request;

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
public class VehicleAssignmentReqDto extends ABaseReqDto {
    @NotNull(message = "El ID del vehículo es obligatorio")
    private Long vehicleId;

    @NotNull(message = "El ID del conductor es obligatorio")
    private Long driverId;

    @NotNull(message = "El estado de asignación es obligatorio")
    private AssigmentStatusType assignmentStatus;

    private String note;
}