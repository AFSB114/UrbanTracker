package com.sena.urbantracker.vehicles.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VehicleTypeResDtoA extends ABaseResDto {

    private String name;
    private String description;
}