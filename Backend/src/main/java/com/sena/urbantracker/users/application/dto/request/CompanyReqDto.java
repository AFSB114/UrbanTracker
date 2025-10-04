package com.sena.urbantracker.users.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyReqDto {
    @NotBlank(message = "El nombre de la compañía es obligatorio")
    private String name;

    @NotBlank(message = "El NIT de la compañía es obligatorio")
    private String nit;

    private String phone;

    @NotBlank(message = "El email de la compañía es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    private String email;

    private String country;
}