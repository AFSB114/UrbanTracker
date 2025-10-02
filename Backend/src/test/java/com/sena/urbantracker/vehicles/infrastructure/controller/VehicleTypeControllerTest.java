package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.enums.OperationType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleTypeReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleTypeResDto;
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

@WebMvcTest(VehicleTypeController.class)
@WithMockUser(roles = "ADMIN")
class VehicleTypeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<VehicleTypeReqDto, VehicleTypeResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private VehicleTypeReqDto validReqDto;
    private VehicleTypeResDto resDto;
    private CrudResponseDto<VehicleTypeResDto> successResponse;
    private CrudResponseDto<Optional<VehicleTypeResDto>> findByIdResponse;
    private CrudResponseDto<List<VehicleTypeResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = VehicleTypeReqDto.builder()
                .name("Sedan")
                .description("Tipo de vehículo sedan")
                .build();

        resDto = VehicleTypeResDto.builder()
                .id(1L)
                .name("Sedan")
                .description("Tipo de vehículo sedan")
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.VEHICLE_TYPE.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.VEHICLE_TYPE.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.VEHICLE_TYPE.getDisplayName());

        when(serviceFactory.getService(EntityType.VEHICLE_TYPE, VehicleTypeReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/vehicle-type")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Sedan"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        VehicleTypeReqDto invalidReqDto = VehicleTypeReqDto.builder()
                .name("") // Invalid: blank
                .build();

        mockMvc.perform(post("/api/v1/vehicle-type")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/vehicle-type/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Sedan"));
    }

    @Test
    void findById_ShouldReturnNotFound_WhenEntityDoesNotExist() throws Exception {
        CrudResponseDto<Optional<VehicleTypeResDto>> notFoundResponse = CrudResponseDto.error("Entity not found", null, EntityType.VEHICLE_TYPE.getDisplayName());
        when(crudOperations.findById(1L)).thenReturn(notFoundResponse);

        mockMvc.perform(get("/api/v1/vehicle-type/1"))
                .andExpect(status().isOk()) // Since the controller returns 200 even for errors in CrudResponseDto
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/vehicle-type"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("Sedan"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<VehicleTypeResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.VEHICLE_TYPE.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/vehicle-type/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void update_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        VehicleTypeReqDto invalidReqDto = VehicleTypeReqDto.builder()
                .name("") // Invalid
                .build();

        mockMvc.perform(put("/api/v1/vehicle-type/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<VehicleTypeResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.VEHICLE_TYPE.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/vehicle-type/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}