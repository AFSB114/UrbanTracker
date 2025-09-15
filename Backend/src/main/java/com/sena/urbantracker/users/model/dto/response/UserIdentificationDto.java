package com.sena.urbantracker.users.model.dto.response;

import com.sena.urbantracker.security.model.entity.User;
import com.sena.urbantracker.shared.model.dto.BaseDto;
import com.sena.urbantracker.users.model.entity.IdentificationType;
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
