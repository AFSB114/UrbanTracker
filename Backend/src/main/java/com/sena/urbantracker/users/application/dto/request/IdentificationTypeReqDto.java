package com.sena.urbantracker.users.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class IdentificationTypeReqDto extends ABaseReqDto {
    private String name;
    private String description;
}