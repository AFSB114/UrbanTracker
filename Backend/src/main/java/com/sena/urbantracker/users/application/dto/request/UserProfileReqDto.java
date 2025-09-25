package com.sena.urbantracker.users.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class UserProfileReqDto extends ABaseReqDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Long userId;
}