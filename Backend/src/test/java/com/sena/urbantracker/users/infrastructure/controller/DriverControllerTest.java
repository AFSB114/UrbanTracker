package com.sena.urbantracker.users.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
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

@WebMvcTest(DriverController.class)
@WithMockUser
class DriverControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<DriverReqDto, DriverResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private DriverReqDto validReqDto;
    private DriverResDto resDto;
    private CrudResponseDto<DriverResDto> successResponse;
    private CrudResponseDto<Optional<DriverResDto>> findByIdResponse;
    private CrudResponseDto<List<DriverResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = DriverReqDto.builder()
                .idNumber("123456789")
                .password("password123")
                .roleId(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .phone("1234567890")
                .build();

        resDto = DriverResDto.builder()
                .id(1L)
                .userId("user123")
                .active(true)
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "DRIVER");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "DRIVER");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "DRIVER");

        when(serviceFactory.getService(EntityType.DRIVER, DriverReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/driver")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.userId").value("user123"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        DriverReqDto invalidReqDto = DriverReqDto.builder()
                .idNumber("") // Invalid: blank
                .build();

        mockMvc.perform(post("/api/v1/public/driver")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/driver/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.userId").value("user123"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/driver"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].userId").value("user123"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<DriverResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "DRIVER");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/driver/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<DriverResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "DRIVER");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/driver/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}