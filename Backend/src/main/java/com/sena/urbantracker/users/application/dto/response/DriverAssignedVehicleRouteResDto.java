package com.sena.urbantracker.users.application.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DriverAssignedVehicleRouteResDto {

    private String licencePlate;
    private Integer numberRoute;

    public DriverAssignedVehicleRouteResDto(String licencePlate, Integer numberRoute) {
        this.licencePlate = licencePlate;
        this.numberRoute = numberRoute;
    }
}