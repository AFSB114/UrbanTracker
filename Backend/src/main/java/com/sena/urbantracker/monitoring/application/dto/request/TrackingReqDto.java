package com.sena.urbantracker.monitoring.application.dto.request;

import com.sena.urbantracker.monitoring.domain.valueobject.DataSourceType;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.swing.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrackingReqDto {

    @NotNull(message = "El ID de la ruta es obligatorio")
    private Long routeId;

    @NotBlank(message = "El ID del vehículo es obligatorio")
    private String vehicleId;

    @NotNull(message = "El timestamp es obligatorio")
    private OffsetDateTime timestamp;

    @NotNull(message = "La latitud es obligatoria")
    private BigDecimal latitude;

    @NotNull(message = "La longitud es obligatoria")
    private BigDecimal  longitude;

    @NotNull(message = "La fuente de datos es obligatoria")
    private DataSourceType dataSource;
}