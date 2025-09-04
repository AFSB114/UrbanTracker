package com.sena.urbantracker.monitoring.model.dto.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sena.urbantracker.monitoring.model.enums.DataSourceType;
import lombok.*;

import java.time.OffsetDateTime;

/**
 * Lightweight DTO for real-time location messages over MQTT (monitoring domain).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RealTimeLocationMessage {
    private String vehicleId; // String for decoupling from the persistence layer
    private Long trajectoryId;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private OffsetDateTime timestamp;

    private Double latitude;
    private Double longitude;
    private DataSourceType dataSource;
}
