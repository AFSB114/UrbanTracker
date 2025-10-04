package com.sena.urbantracker.vehicles.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import com.sena.urbantracker.vehicles.domain.valueobject.VehicleStatusType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleReqDto extends ABaseReqDto {
    @NotNull(message = "El ID de la compañía es obligatorio")
    private Long companyId;

    @NotNull(message = "El ID del tipo de vehículo es obligatorio")
    private Long vehicleTypeId;

    @NotBlank(message = "La placa del vehículo es obligatoria")
    @Pattern(regexp = "^[A-Z]{3}-\\d{3}$", message = "La placa debe tener formato AAA-123")
    private String licencePlate;

    @NotBlank(message = "La marca es obligatoria")
    private String brand;

    @NotBlank(message = "El modelo es obligatorio")
    private String model;

    @NotNull(message = "El año es obligatorio")
    private Integer year;

    private String color;

    @NotNull(message = "La capacidad de pasajeros es obligatoria")
    private Integer passengerCapacity;

    private VehicleStatusType status;

    private boolean inService;
}