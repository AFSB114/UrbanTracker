package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.shared.domain.dto.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true) // Comparar con todos los campos de la superclase
public class CompanyDTO extends BaseDto {

    private String name;
    private String nit;
    private String phone;
    private String email;
    private String country;
}
