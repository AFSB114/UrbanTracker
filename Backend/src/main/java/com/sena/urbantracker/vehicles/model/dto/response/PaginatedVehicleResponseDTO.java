package com.sena.urbantracker.vehicles.model.dto.response;

import com.sena.urbantracker.vehicles.model.dto.request.PaginateVehicleCountsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PaginatedVehicleResponseDTO {
    private List<PaginateVehicleCountsDTO> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean first;
    private boolean last;
    private boolean hasNext;
    private boolean hasPrevious;
}
