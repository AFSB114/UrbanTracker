package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.enums.OperationType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleResDto;
import com.sena.urbantracker.vehicles.domain.valueobject.VehicleStatusType;
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

@WebMvcTest(VehicleController.class)
@WithMockUser(roles = "ADMIN")
class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<VehicleReqDto, VehicleResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private VehicleReqDto validReqDto;
    private VehicleResDto resDto;
    private CrudResponseDto<VehicleResDto> successResponse;
    private CrudResponseDto<Optional<VehicleResDto>> findByIdResponse;
    private CrudResponseDto<List<VehicleResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = VehicleReqDto.builder()
                .companyId(1L)
                .vehicleTypeId(1L)
                .licencePlate("ABC123")
                .brand("Toyota")
                .model("Corolla")
                .year(2020)
                .color("White")
                .passengerCapacity(5)
                .status(VehicleStatusType.ACTIVE)
                .inService(true)
                .build();

        resDto = VehicleResDto.builder()
                .id(1L)
                .licencePlate("ABC123")
                .brand("Toyota")
                .model("Corolla")
                .year(2020)
                .color("White")
                .passengerCapacity(5)
                .status("ACTIVE")
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.VEHICLE.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.VEHICLE.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.VEHICLE.getDisplayName());

        when(serviceFactory.getService(EntityType.VEHICLE, VehicleReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/vehicle")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.licencePlate").value("ABC123"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        VehicleReqDto invalidReqDto = VehicleReqDto.builder()
                .licencePlate("") // Invalid: blank
                .build();

        mockMvc.perform(post("/api/v1/public/vehicle")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/vehicle/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.licencePlate").value("ABC123"));
    }

    @Test
    void findById_ShouldReturnNotFound_WhenEntityDoesNotExist() throws Exception {
        CrudResponseDto<Optional<VehicleResDto>> notFoundResponse = CrudResponseDto.error("Entity not found", null, "VEHICLE");
        when(crudOperations.findById(1L)).thenReturn(notFoundResponse);

        mockMvc.perform(get("/api/v1/public/vehicle/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/vehicle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].licencePlate").value("ABC123"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<VehicleResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.VEHICLE.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/vehicle/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void update_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        VehicleReqDto invalidReqDto = VehicleReqDto.builder()
                .brand("") // Invalid
                .build();

        mockMvc.perform(put("/api/v1/public/vehicle/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<VehicleResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.VEHICLE.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/vehicle/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}