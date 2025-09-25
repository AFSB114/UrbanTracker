package com.sena.urbantracker.users.application.dto.response;

import com.sena.urbantracker.shared.application.dto.response.ABaseResDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserProfileResDto extends ABaseResDto {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Long userId;

}