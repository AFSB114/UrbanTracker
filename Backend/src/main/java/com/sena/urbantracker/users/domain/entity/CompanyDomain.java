package com.sena.urbantracker.users.domain.entity;

import com.sena.urbantracker.shared.application.dto.ABaseDomain;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CompanyDomain extends ABaseDomain {
    private String name;
    private String nit;
    private String phone;
    private String email;
    private String country;
}