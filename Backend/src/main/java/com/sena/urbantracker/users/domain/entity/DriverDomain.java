package com.sena.urbantracker.users.domain.entity;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.CascadeType;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DriverDomain extends ABaseDomain {

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private UserDomain user;

    private UserProfileDomain profile;

}