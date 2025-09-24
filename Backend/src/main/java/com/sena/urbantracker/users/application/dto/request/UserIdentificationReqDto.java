package com.sena.urbantracker.users.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class UserIdentificationReqDto extends ABaseReqDto {
    private Long identificationTypeId;
    private String identificationNumber;
}