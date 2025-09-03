package com.sena.urbantracker.vehicles.model.dto.request;

import com.sena.urbantracker.vehicles.model.enums.VehicleStatusType;

public record PaginateVehicleCountsDTO(
        String brand,
        String licencePlate,
        String model,
        VehicleStatusType status,
        String nameCompany,
        String userName) {
}
