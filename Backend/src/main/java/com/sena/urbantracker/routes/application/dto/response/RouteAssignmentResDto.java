package com.sena.urbantracker.routes.application.dto.response;

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
public class RouteAssignmentResDto extends ABaseResDto {

    private Long routeId;
    private String routeNumber;
    private Long vehicleId;
    private String vehiclePlate;
    private AssigmentStatusType assignmentStatus;
    private String note;
}