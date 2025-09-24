package com.sena.urbantracker.users.domain.entity;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserProfileDomain extends ABaseDomain {
    private UserDomain user;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}