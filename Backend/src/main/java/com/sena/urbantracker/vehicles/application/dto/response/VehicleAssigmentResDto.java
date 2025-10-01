package com.sena.urbantracker.vehicles.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleAssigmentResDto extends ABaseResDto {
    private Long vehicleId;
    private String vehiclePlate;
    private String vehicleName;
    private Long driverId;
    private String driverName;
    private String note;
    private AssigmentStatusType assignmentStatus;
}
