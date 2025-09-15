package com.sena.urbantracker.vehicles.model.dto.response;

import com.sena.urbantracker.shared.model.dto.BaseDto;
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
    private String nameDriver;
    private String nameCompany;
    private String userName;
    private String licencePlate;
    private String status;
}
