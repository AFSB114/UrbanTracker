package com.sena.urbantracker.vehicles.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import com.sena.urbantracker.users.domain.entity.Driver;
import com.sena.urbantracker.vehicles.domain.entity.Vehicle;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleAssigmentResDtoA extends ABaseResDto {

    private Vehicle vehicle;
    private Driver driver;
    private String note;
    private AssigmentStatusType assignmentStatus;
}
