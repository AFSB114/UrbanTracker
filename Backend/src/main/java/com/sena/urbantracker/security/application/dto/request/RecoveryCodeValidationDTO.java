package com.sena.urbantracker.security.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecoveryCodeValidationDTO {
    private String email;
    private String code;
}
