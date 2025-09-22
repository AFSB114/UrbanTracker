package com.sena.urbantracker.vehicles.application.dto.response;

import com.sena.urbantracker.shared.domain.dto.BaseDto;
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
public class VehicleAssigmentDto extends BaseDto {

    private Vehicle vehicle;
    private Driver driver;
    private String note;
    private AssigmentStatusType assignmentStatus;
}
