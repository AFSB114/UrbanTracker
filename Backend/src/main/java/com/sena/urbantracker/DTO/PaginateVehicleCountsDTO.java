package com.sena.urbantracker.DTO;

import com.sena.urbantracker.enums.VehicleStatusType;

public record PaginateVehicleCountsDTO(
        String brand,
        String licencePlate,
        String model,
        VehicleStatusType status,
        String nameCompany,
        String userName) {
}
