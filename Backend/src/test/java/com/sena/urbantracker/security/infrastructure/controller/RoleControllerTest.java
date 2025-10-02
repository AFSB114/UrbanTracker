package com.sena.urbantracker.security.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.security.application.dto.request.RoleReqDto;
import com.sena.urbantracker.security.application.dto.request.RoleResDto;
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

@WebMvcTest(RoleController.class)
@WithMockUser(roles = "ADMIN")
class RoleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<RoleReqDto, RoleResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RoleReqDto validReqDto;
    private RoleResDto resDto;
    private CrudResponseDto<RoleResDto> successResponse;
    private CrudResponseDto<Optional<RoleResDto>> findByIdResponse;
    private CrudResponseDto<List<RoleResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RoleReqDto.builder()
                .name("ADMIN")
                .description("Administrator role")
                .build();

        resDto = RoleResDto.builder()
                .id(1L)
                .name("ADMIN")
                .description("Administrator role")
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "ROLE");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "ROLE");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "ROLE");

        when(serviceFactory.getService(EntityType.ROLE, RoleReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/security/role")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("ADMIN"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        RoleReqDto invalidReqDto = RoleReqDto.builder()
                .name("") // Invalid: blank
                .build();

        mockMvc.perform(post("/api/v1/security/role")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/security/role/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("ADMIN"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/security/role"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("ADMIN"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RoleResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "ROLE");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/security/role/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RoleResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "ROLE");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/security/role/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}