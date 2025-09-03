package com.sena.urbantracker.security.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecoveryRequestDTO {
    private int id;
    private String email;
    private String token;
    private Integer expirationTime;
    private Integer user;
}
