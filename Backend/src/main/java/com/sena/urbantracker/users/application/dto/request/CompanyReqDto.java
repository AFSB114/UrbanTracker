package com.sena.urbantracker.users.application.dto.request;

import lombok.Data;

@Data
public class CompanyReqDto {
    private String name;
    private String nit;
    private String phone;
    private String email;
    private String country;
}