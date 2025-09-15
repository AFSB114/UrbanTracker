package com.sena.urbantracker.users.model.dto.response;

import com.sena.urbantracker.security.model.entity.User;
import com.sena.urbantracker.shared.model.dto.BaseDto;
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
