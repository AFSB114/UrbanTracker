package com.sena.urbantracker.users.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.enums.OperationType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.CompanyReqDto;
import com.sena.urbantracker.users.application.dto.response.CompanyResDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CompanyController.class)
@WithMockUser
class CompanyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    @SuppressWarnings("rawtypes")
    private CrudOperations crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private CompanyReqDto validReqDto;
    private CompanyResDto resDto;
    private CrudResponseDto<CompanyResDto> successResponse;
    private CrudResponseDto<Optional<CompanyResDto>> findByIdResponse;
    private CrudResponseDto<List<CompanyResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = CompanyReqDto.builder()
                .name("Test Company")
                .nit("123456789")
                .phone("1234567890")
                .email("test@company.com")
                .country("Colombia")
                .build();

        resDto = CompanyResDto.builder()
                .id(1L)
                .name("Test Company")
                .nit("123456789")
                .phone("1234567890")
                .email("test@company.com")
                .country("Colombia")
                .build();

        successResponse = CrudResponseDto.success(resDto, com.sena.urbantracker.shared.domain.enums.OperationType.CREATE, EntityType.COMPANY.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), com.sena.urbantracker.shared.domain.enums.OperationType.READ, EntityType.COMPANY.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), com.sena.urbantracker.shared.domain.enums.OperationType.READ, EntityType.COMPANY.getDisplayName());

        when(serviceFactory.getService(EntityType.COMPANY, CompanyReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/company")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Test Company"));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/company/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Test Company"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/company"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("Test Company"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<CompanyResDto> updateResponse = CrudResponseDto.success(resDto, com.sena.urbantracker.shared.domain.enums.OperationType.UPDATE, EntityType.COMPANY.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/company/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<CompanyResDto> deleteResponse = CrudResponseDto.success(null, com.sena.urbantracker.shared.domain.enums.OperationType.DELETE, EntityType.COMPANY.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/company/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}