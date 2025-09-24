package com.sena.urbantracker.users.domain.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class IdentificationTypeDomain {
    private Long id;
    private String typeName;
    private String description;
    private String country;
}