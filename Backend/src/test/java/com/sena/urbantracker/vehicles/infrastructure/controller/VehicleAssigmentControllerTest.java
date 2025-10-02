package com.sena.urbantracker.vehicles.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.enums.OperationType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.request.VehicleAssignmentReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleAssigmentResDto;
import com.sena.urbantracker.vehicles.application.service.VehicleAssigmentService;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
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

@WebMvcTest(VehicleAssigmentController.class)
@WithMockUser(roles = "ADMIN")
class VehicleAssigmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private VehicleAssigmentService vehicleAssigmentService;

    @MockBean
    private CrudOperations<VehicleAssignmentReqDto, VehicleAssigmentResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private VehicleAssignmentReqDto validReqDto;
    private VehicleAssigmentResDto resDto;
    private CrudResponseDto<VehicleAssigmentResDto> successResponse;
    private CrudResponseDto<Optional<VehicleAssigmentResDto>> findByIdResponse;
    private CrudResponseDto<List<VehicleAssigmentResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = VehicleAssignmentReqDto.builder()
                .vehicleId(1L)
                .driverId(1L)
                .assignmentStatus(AssigmentStatusType.ACTIVE)
                .note("Test assignment")
                .build();

        resDto = VehicleAssigmentResDto.builder()
                .id(1L)
                .vehicleId(1L)
                .vehiclePlate("ABC123")
                .vehicleName("Toyota Corolla")
                .driverId(1L)
                .driverName("John Doe")
                .assignmentStatus(AssigmentStatusType.ACTIVE)
                .note("Test assignment")
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.VEHICLE_ASSIGMENT.getDisplayName());

        when(serviceFactory.getService(EntityType.VEHICLE_ASSIGMENT, VehicleAssignmentReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(vehicleAssigmentService.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/vehicle-assigment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.vehiclePlate").value("ABC123"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        VehicleAssignmentReqDto invalidReqDto = VehicleAssignmentReqDto.builder()
                .vehicleId(null) // Invalid: null
                .build();

        mockMvc.perform(post("/api/v1/vehicle-assigment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(vehicleAssigmentService.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/vehicle-assigment/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.vehiclePlate").value("ABC123"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(vehicleAssigmentService.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/vehicle-assigment"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].vehiclePlate").value("ABC123"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<VehicleAssigmentResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        when(vehicleAssigmentService.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/vehicle-assigment/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<VehicleAssigmentResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        when(vehicleAssigmentService.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/vehicle-assigment/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void findByRouteId_ShouldReturnOk() throws Exception {
        CrudResponseDto<List<VehicleAssigmentResDto>> response = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        when(vehicleAssigmentService.findByRouteId(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/vehicle-assigment/route/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void findByVehicleId_ShouldReturnOk() throws Exception {
        CrudResponseDto<List<VehicleAssigmentResDto>> response = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        when(vehicleAssigmentService.findByVehicleId(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/vehicle-assigment/vehicle/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void activate_ShouldReturnOk() throws Exception {
        CrudResponseDto<VehicleAssigmentResDto> response = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        when(vehicleAssigmentService.activateById(1L)).thenReturn(response);

        mockMvc.perform(patch("/api/v1/vehicle-assigment/1/activate")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void deactivate_ShouldReturnOk() throws Exception {
        CrudResponseDto<VehicleAssigmentResDto> response = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.VEHICLE_ASSIGMENT.getDisplayName());
        when(vehicleAssigmentService.deactivateById(1L)).thenReturn(response);

        mockMvc.perform(patch("/api/v1/vehicle-assigment/1/deactivate")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}