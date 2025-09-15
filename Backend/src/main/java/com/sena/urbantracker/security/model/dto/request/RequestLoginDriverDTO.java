package com.sena.urbantracker.security.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestLoginDriverDTO {

    private String userName;
    private String password;

}
