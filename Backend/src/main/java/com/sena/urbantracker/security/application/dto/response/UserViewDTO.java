package com.sena.urbantracker.security.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserViewDTO {
    private Long id;
    private String userName;
    private Long role;
}
