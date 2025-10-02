package com.sena.urbantracker.monitoring.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.monitoring.application.dto.request.TrackingReqDto;
import com.sena.urbantracker.monitoring.application.dto.response.TrackingResDto;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.enums.OperationType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TrackingController.class)
@WithMockUser(roles = "ADMIN")
class TrackingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private TrackingReqDto validReqDto;
    private TrackingResDto resDto;
    private CrudResponseDto<TrackingResDto> successResponse;
    private CrudResponseDto<Optional<TrackingResDto>> findByIdResponse;
    private CrudResponseDto<List<TrackingResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = TrackingReqDto.builder()
                .routeId(1L)
                .vehicleId("1")
                .latitude(BigDecimal.valueOf(4.60971))
                .longitude(BigDecimal.valueOf(-74.08175))
                .build();

        resDto = TrackingResDto.builder()
                .id(1L)
                .routeId("1")
                .vehicleId("1")
                .latitude(BigDecimal.valueOf(4.60971))
                .longitude(BigDecimal.valueOf(-74.08175))
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.TRACKING.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.TRACKING.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.TRACKING.getDisplayName());

        when(serviceFactory.getService(EntityType.TRACKING, TrackingReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/tracking")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.latitude").value(4.60971));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/tracking/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.latitude").value(4.60971));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/tracking"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].latitude").value(4.60971));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<TrackingResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.TRACKING.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/tracking/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<TrackingResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.TRACKING.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/tracking/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}