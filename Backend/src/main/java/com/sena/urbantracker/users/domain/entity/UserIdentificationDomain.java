package com.sena.urbantracker.users.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserIdentificationDomain extends ABaseDomain {
    private UserProfileDomain user;
    private IdentificationTypeDomain identificationType;
    private String identificationNumber;
}