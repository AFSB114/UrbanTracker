package com.sena.urbantracker.vehicles.model.dto.response;

import com.sena.urbantracker.shared.model.dto.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleTypeDto extends BaseDto {

    private String name;
    private String description;
}
