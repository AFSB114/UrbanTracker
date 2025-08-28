package com.sena.urbantracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginateCountVehicleDTO {

    Integer totalVehicles;
    String licencePlate;
    String brand;
    String model;
    String nameDriver;

}
