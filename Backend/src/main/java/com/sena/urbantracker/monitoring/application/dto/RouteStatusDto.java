package com.sena.urbantracker.monitoring.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteStatusDto {
    private String status; // e.g., "ACTIVE", "INACTIVE"
    private OffsetDateTime timestamp;
}