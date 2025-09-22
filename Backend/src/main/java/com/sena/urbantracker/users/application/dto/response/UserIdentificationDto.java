package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.shared.domain.dto.BaseDto;
import com.sena.urbantracker.users.domain.entity.IdentificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserIdentificationDto extends BaseDto {

    private User user;
    private IdentificationType identificationType;
    private String identificationNumber;
}
