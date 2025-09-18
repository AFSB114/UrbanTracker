package com.sena.urbantracker.vehicles.model.dto.response;

import com.sena.urbantracker.shared.model.dto.BaseDto;
import com.sena.urbantracker.users.model.entity.Company;
import com.sena.urbantracker.vehicles.model.entity.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true) // Comparar con todos los campos de la superclase
public class VehicleDto extends BaseDto {

    private String brand;
    private String model;
    private Integer year;
    private String color;
    private Integer passengerCapacity;
    private Company company;
    private String licencePlate;
    private VehicleType vehicleType;
    private String status;
}
