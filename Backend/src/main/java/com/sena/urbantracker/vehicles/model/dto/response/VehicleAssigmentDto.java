package com.sena.urbantracker.vehicles.model.dto.response;

import com.sena.urbantracker.shared.model.dto.BaseDto;
import com.sena.urbantracker.users.model.entity.Driver;
import com.sena.urbantracker.vehicles.model.entity.Vehicle;
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
}
