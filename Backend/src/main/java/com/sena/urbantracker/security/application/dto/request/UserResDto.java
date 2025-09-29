package com.sena.urbantracker.security.application.dto.request;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserResDto extends ABaseResDto {
    private String userName;
    private RoleResDto role;
    private LocalDateTime lastLogin;
}