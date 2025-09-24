package com.sena.urbantracker.security.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDomain extends ABaseDomain {
    private String userName;
    private String password;
    private RoleDomain role;
    private LocalDateTime lastLogin;
}