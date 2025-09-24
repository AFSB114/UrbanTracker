package com.sena.urbantracker.users.domain.entity;

import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserIdentificationDomain extends ABaseDomain {
    private User user;
    private IdentificationTypeDomain identificationType;
    private String identificationNumber;
}