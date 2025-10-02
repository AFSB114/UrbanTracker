package com.sena.urbantracker.users.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.response.UserIdentificationResDto;
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

@WebMvcTest(UserIdentificationController.class)
@WithMockUser
class UserIdentificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<UserIdentificationResDto, UserIdentificationResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private UserIdentificationResDto validReqDto;
    private UserIdentificationResDto resDto;
    private CrudResponseDto<UserIdentificationResDto> successResponse;
    private CrudResponseDto<Optional<UserIdentificationResDto>> findByIdResponse;
    private CrudResponseDto<List<UserIdentificationResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = UserIdentificationResDto.builder()
                .identificationNumber("123456789")
                .build();

        resDto = UserIdentificationResDto.builder()
                .id(1L)
                .identificationNumber("123456789")
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "USER_IDENTIFICATION");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "USER_IDENTIFICATION");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "USER_IDENTIFICATION");

        when(serviceFactory.getService(EntityType.USER_IDENTIFICATION, UserIdentificationResDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/user-identification")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.identificationNumber").value("123456789"));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/user-identification/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.identificationNumber").value("123456789"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/user-identification"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].identificationNumber").value("123456789"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<UserIdentificationResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "USER_IDENTIFICATION");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/user-identification/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<UserIdentificationResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "USER_IDENTIFICATION");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/user-identification/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}