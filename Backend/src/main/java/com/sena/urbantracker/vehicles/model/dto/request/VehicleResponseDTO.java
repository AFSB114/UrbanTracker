package com.sena.urbantracker.vehicles.model.dto.request;

import java.util.List;

public record VehicleResponseDTO(List<PaginateVehicleCountsDTO> vehicles,
                                 Integer total) {
}
