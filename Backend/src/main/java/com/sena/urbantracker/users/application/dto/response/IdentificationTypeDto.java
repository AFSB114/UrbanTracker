package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.shared.domain.dto.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class IdentificationTypeDto extends BaseDto {

    private String typeName;
    private String description;
    private String country;
}
