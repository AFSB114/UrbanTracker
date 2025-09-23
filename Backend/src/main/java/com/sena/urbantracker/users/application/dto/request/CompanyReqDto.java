package com.sena.urbantracker.users.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CompanyReqDto {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 1, max = 200, message = "El nombre debe tener entre 1 y 200 caracteres")
    private String name;

    @NotBlank(message = "El NIT es obligatorio")
    @Size(min = 1, max = 20, message = "El NIT debe tener entre 1 y 20 caracteres")
    private String nit;

    @Size(max = 20, message = "El teléfono no puede exceder los 20 caracteres")
    private String phone;

    @Size(max = 100, message = "El email no puede exceder los 100 caracteres")
    private String email;

    @NotBlank(message = "El país es obligatorio")
    @Size(min = 1, max = 50, message = "El país debe tener entre 1 y 50 caracteres")
    private String country;
}