package com.sena.urbantracker.monitoring.application.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Builder
@Data
public class TrackingResDto {

    private Long id;
    private String routeId;
    private String vehicleId;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private OffsetDateTime timestamp;
}