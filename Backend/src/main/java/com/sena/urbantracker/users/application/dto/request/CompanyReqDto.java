package com.sena.urbantracker.users.application.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyReqDto {
    private String name;
    private String nit;
    private String phone;
    private String email;
    private String country;
}