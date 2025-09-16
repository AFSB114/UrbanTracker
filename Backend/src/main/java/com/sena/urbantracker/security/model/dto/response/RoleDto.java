package com.sena.urbantracker.security.model.dto.response;

import com.sena.urbantracker.shared.model.dto.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class RoleDto extends BaseDto {

    private String name;
    private String description;

}
