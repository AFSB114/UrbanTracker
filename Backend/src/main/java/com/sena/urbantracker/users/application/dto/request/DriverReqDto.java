package com.sena.urbantracker.users.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverReqDto {
    //datos de user
    @NotBlank(message = "El numero de identificación es obligatorio")
    @Size(min = 3, max = 50, message = "El numero de identificación debe tener entre 3 y 50 caracteres")
    private String idNumber;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    @NotBlank(message = "El rol es obligatorio")
    private Long roleId;

    //datos de UserProfile
    @NotBlank(message = "El nombre es obligatorio")
    private String firstName;

    @NotBlank(message = "El apellido es obligatorio")
    private String lastName;

    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "El numero de celular es obligatorio")
    private String phone;

}