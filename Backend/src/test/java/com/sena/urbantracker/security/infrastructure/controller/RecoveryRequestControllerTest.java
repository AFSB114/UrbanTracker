package com.sena.urbantracker.security.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.security.application.dto.request.RecoveryRequestReqDto;
import com.sena.urbantracker.security.application.dto.request.RecoveryRequestResDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecoveryRequestController.class)
@WithMockUser(roles = "ADMIN")
class RecoveryRequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<RecoveryRequestReqDto, RecoveryRequestResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RecoveryRequestReqDto validReqDto;
    private RecoveryRequestResDto resDto;
    private CrudResponseDto<RecoveryRequestResDto> successResponse;
    private CrudResponseDto<Optional<RecoveryRequestResDto>> findByIdResponse;
    private CrudResponseDto<List<RecoveryRequestResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RecoveryRequestReqDto.builder()
                .code("123456")
                .expirationTime(LocalDateTime.now().plusHours(1))
                .userId(1L)
                .build();

        resDto = RecoveryRequestResDto.builder()
                .id(1L)
                .code("123456")
                .expirationTime(LocalDateTime.now().plusHours(1))
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "RECOVERY_REQUEST");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "RECOVERY_REQUEST");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "RECOVERY_REQUEST");

        when(serviceFactory.getService(EntityType.RECOVERY_REQUEST, RecoveryRequestReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/security/recovery-request")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.code").value("123456"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        RecoveryRequestReqDto invalidReqDto = RecoveryRequestReqDto.builder()
                .code("") // Invalid: blank
                .build();

        mockMvc.perform(post("/api/v1/security/recovery-request")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/security/recovery-request/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.code").value("123456"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/security/recovery-request"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].code").value("123456"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RecoveryRequestResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "RECOVERY_REQUEST");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/security/recovery-request/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RecoveryRequestResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "RECOVERY_REQUEST");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/security/recovery-request/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}