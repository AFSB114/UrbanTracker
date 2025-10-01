package com.sena.urbantracker.monitoring.application.dto.request;

import com.sena.urbantracker.monitoring.domain.valueobject.DataSourceType;
import com.sena.urbantracker.vehicles.infrastructure.persistence.model.VehicleModel;
import jakarta.persistence.*;
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

    private String vehicleId;

    private OffsetDateTime timestamp;

    private BigDecimal latitude;

    private BigDecimal  longitude;

    private DataSourceType dataSource;
}