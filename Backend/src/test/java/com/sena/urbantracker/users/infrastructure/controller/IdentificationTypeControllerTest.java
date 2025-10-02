package com.sena.urbantracker.users.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.response.IdentificationTypeResDto;
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

@WebMvcTest(IdentificationTypeController.class)
@WithMockUser
class IdentificationTypeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<IdentificationTypeResDto, IdentificationTypeResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private IdentificationTypeResDto validReqDto;
    private IdentificationTypeResDto resDto;
    private CrudResponseDto<IdentificationTypeResDto> successResponse;
    private CrudResponseDto<Optional<IdentificationTypeResDto>> findByIdResponse;
    private CrudResponseDto<List<IdentificationTypeResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = IdentificationTypeResDto.builder()
                .typeName("CC")
                .description("Cédula de Ciudadanía")
                .country("Colombia")
                .build();

        resDto = IdentificationTypeResDto.builder()
                .id(1L)
                .typeName("CC")
                .description("Cédula de Ciudadanía")
                .country("Colombia")
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "IDENTIFICATION_TYPE");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "IDENTIFICATION_TYPE");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "IDENTIFICATION_TYPE");

        when(serviceFactory.getService(EntityType.IDENTIFICATION_TYPE, IdentificationTypeResDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/identification-type")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.typeName").value("CC"));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/identification-type/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.typeName").value("CC"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/identification-type"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].typeName").value("CC"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<IdentificationTypeResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "IDENTIFICATION_TYPE");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/identification-type/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<IdentificationTypeResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "IDENTIFICATION_TYPE");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/identification-type/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}