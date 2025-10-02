package com.sena.urbantracker.security.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseLoginDTO {
    private String token;
    private Map<String, Object> user;

    // Constructor solo con token para compatibilidad
    public ResponseLoginDTO(String token) {
        this.token = token;
        this.user = null;
    }
}
