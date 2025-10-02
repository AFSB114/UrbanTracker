package com.sena.urbantracker.monitoring.domain.entity;

import com.sena.urbantracker.monitoring.domain.valueobject.DataSourceType;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class TrackingDomain extends ABaseDomain {
    private Long routeId;
    private Long vehicleId; // Assuming vehicle is referenced by ID in domain
    private OffsetDateTime timestamp;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private DataSourceType dataSource;
}