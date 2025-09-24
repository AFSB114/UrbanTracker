package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class IdentificationTypeResDto extends ABaseResDto {

    private String typeName;
    private String description;
    private String country;
}
