package com.sena.urbantracker.security.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RecoveryRequestReqDto extends ABaseReqDto {
    @NotBlank(message = "El código es obligatorio")
    private String code;

    @NotBlank(message = "La expiración es obligatoria")
    private LocalDateTime expirationTime;

    @NotBlank(message = "El usuario es obligatorio")
    private Long userId;
}