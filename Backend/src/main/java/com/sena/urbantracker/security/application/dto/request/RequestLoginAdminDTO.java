package com.sena.urbantracker.security.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestLoginAdminDTO {
    private String userName;
    private String password;
}
