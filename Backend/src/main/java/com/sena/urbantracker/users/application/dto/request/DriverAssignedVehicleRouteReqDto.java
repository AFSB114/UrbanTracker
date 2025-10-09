package com.sena.urbantracker.users.application.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DriverAssignedVehicleRouteReqDto {

    @NotNull(message = "El ID del conductor es obligatorio")
    private Long driverId;
}