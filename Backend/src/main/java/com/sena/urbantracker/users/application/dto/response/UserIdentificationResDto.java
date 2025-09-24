package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserIdentificationResDto extends ABaseResDto {

    private User user;
    private IdentificationTypeResDto identificationType;
    private String identificationNumber;
}
