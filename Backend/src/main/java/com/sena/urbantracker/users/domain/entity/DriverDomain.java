package com.sena.urbantracker.users.domain.entity;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DriverDomain extends ABaseDomain {
    private UserDomain user;
}