package com.sena.urbantracker.security.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ForgotPasswordResponseDTO {
    private boolean success;
    private String message;
    private Integer errorCode;
}