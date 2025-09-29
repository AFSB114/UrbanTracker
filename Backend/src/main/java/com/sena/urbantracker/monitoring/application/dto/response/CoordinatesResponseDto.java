package com.sena.urbantracker.monitoring.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoordinatesResponseDto {
    private BigDecimal longitude;
    private BigDecimal latitude;
}