package com.sena.urbantracker.vehicles.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import com.sena.urbantracker.users.domain.entity.Company;
import com.sena.urbantracker.vehicles.domain.entity.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true) // Comparar con todos los campos de la superclase
public class VehicleResDtoA extends ABaseResDto {

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
