package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CompanyResDto extends ABaseResDto {
    private String name;
    private String nit;
    private String phone;
    private String email;
    private String country;
}