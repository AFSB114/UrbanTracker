package com.sena.urbantracker.DTO;

import java.util.List;

public record VehicleResponseDTO(List<PaginateVehicleCountsDTO> vehicles,
                                 Integer total) {
}
