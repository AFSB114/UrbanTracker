package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.shared.domain.dto.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DriverDto extends BaseDto {

    private User user;
}
