package com.sena.urbantracker.security.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.security.application.dto.request.UserReqDto;
import com.sena.urbantracker.security.application.dto.request.UserResDto;
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

@WebMvcTest(UserController.class)
@WithMockUser(roles = "ADMIN")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<UserReqDto, UserResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private UserReqDto validReqDto;
    private UserResDto resDto;
    private CrudResponseDto<UserResDto> successResponse;
    private CrudResponseDto<Optional<UserResDto>> findByIdResponse;
    private CrudResponseDto<List<UserResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = UserReqDto.builder()
                .userName("admin")
                .password("password123")
                .roleId(1L)
                .build();

        resDto = UserResDto.builder()
                .id(1L)
                .userName("admin")
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "USER");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "USER");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "USER");

        when(serviceFactory.getService(EntityType.USER, UserReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/security/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.userName").value("admin"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        UserReqDto invalidReqDto = UserReqDto.builder()
                .userName("") // Invalid: blank
                .build();

        mockMvc.perform(post("/api/v1/security/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/security/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.userName").value("admin"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/security/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].userName").value("admin"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<UserResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "USER");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/security/user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<UserResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "USER");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/security/user/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}