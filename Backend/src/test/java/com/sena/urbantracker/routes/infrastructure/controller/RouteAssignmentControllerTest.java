package com.sena.urbantracker.routes.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.routes.application.dto.request.RouteAssignmentReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteAssignmentResDto;
import com.sena.urbantracker.routes.application.service.RouteAssignmentService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
import com.sena.urbantracker.shared.domain.enums.OperationType;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
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

@WebMvcTest(RouteAssignmentController.class)
@WithMockUser(roles = "ADMIN")
class RouteAssignmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private RouteAssignmentService routeAssignmentService;

    @MockBean
    private CrudOperations<RouteAssignmentReqDto, RouteAssignmentResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RouteAssignmentReqDto validReqDto;
    private RouteAssignmentResDto resDto;
    private CrudResponseDto<RouteAssignmentResDto> successResponse;
    private CrudResponseDto<Optional<RouteAssignmentResDto>> findByIdResponse;
    private CrudResponseDto<List<RouteAssignmentResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RouteAssignmentReqDto.builder()
                .routeId(1L)
                .vehicleId(1L)
                .assignmentStatus(AssigmentStatusType.ACTIVE)
                .note("Test assignment")
                .build();

        resDto = RouteAssignmentResDto.builder()
                .id(1L)
                .routeId(1L)
                .routeNumber("R001")
                .vehicleId(1L)
                .vehiclePlate("ABC123")
                .assignmentStatus(AssigmentStatusType.ACTIVE)
                .note("Test assignment")
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.ROUTE_ASSIGNMENT.getDisplayName());

        when(serviceFactory.getService(EntityType.ROUTE_ASSIGNMENT, RouteAssignmentReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(routeAssignmentService.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/route-assignment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.vehiclePlate").value("ABC123"));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        RouteAssignmentReqDto invalidReqDto = RouteAssignmentReqDto.builder()
                .routeId(null) // Invalid: null
                .build();

        mockMvc.perform(post("/api/v1/route-assignment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(routeAssignmentService.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/route-assignment/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.vehiclePlate").value("ABC123"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(routeAssignmentService.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/route-assignment"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].vehiclePlate").value("ABC123"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RouteAssignmentResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        when(routeAssignmentService.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/route-assignment/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteAssignmentResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        when(routeAssignmentService.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/route-assignment/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void findByRouteId_ShouldReturnOk() throws Exception {
        CrudResponseDto<List<RouteAssignmentResDto>> response = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        when(routeAssignmentService.findByRouteId(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/route-assignment/route/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void findByVehicleId_ShouldReturnOk() throws Exception {
        CrudResponseDto<List<RouteAssignmentResDto>> response = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        when(routeAssignmentService.findByVehicleId(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/route-assignment/vehicle/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void activate_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteAssignmentResDto> response = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        when(routeAssignmentService.activateById(1L)).thenReturn(response);

        mockMvc.perform(patch("/api/v1/route-assignment/1/activate")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void deactivate_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteAssignmentResDto> response = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.ROUTE_ASSIGNMENT.getDisplayName());
        when(routeAssignmentService.deactivateById(1L)).thenReturn(response);

        mockMvc.perform(patch("/api/v1/route-assignment/1/deactivate")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}