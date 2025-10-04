package com.sena.urbantracker.users.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class IdentificationTypeReqDto extends ABaseReqDto {
    @NotBlank(message = "El nombre del tipo de identificación es obligatorio")
    private String name;

    private String description;
}