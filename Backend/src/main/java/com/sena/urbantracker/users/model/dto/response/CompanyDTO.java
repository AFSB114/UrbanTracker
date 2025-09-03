package com.sena.urbantracker.users.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {

    private Integer id;
    private String name;
    private String nit;
    private String address;
    private String contactPhone;
    private String contactEmail;
    private boolean active = true;
    private LocalDateTime createAt;  // solo lectura
    private LocalDateTime updateAt;  // solo lectura

}
