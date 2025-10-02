package com.sena.urbantracker.routes.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.routes.application.dto.request.RouteTrajectoryReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteTrajectoryResDto;
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

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RouteTrajectoryController.class)
@WithMockUser
class RouteTrajectoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private CrudOperations<RouteTrajectoryReqDto, RouteTrajectoryResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RouteTrajectoryReqDto validReqDto;
    private RouteTrajectoryResDto resDto;
    private CrudResponseDto<RouteTrajectoryResDto> successResponse;
    private CrudResponseDto<Optional<RouteTrajectoryResDto>> findByIdResponse;
    private CrudResponseDto<List<RouteTrajectoryResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RouteTrajectoryReqDto.builder()
                .routeId(1L)
                .vehicleId(1L)
                .build();

        resDto = RouteTrajectoryResDto.builder()
                .id(1L)
                .routeId(1L)
                .vehicleId(1L)
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.ROUTE_TRAJECTORY.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.ROUTE_TRAJECTORY.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.ROUTE_TRAJECTORY.getDisplayName());

        when(serviceFactory.getService(EntityType.ROUTE_TRAJECTORY, RouteTrajectoryReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/route-trajectorie")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.routeId").value(1));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/route-trajectorie/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.routeId").value(1));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/route-trajectorie"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].routeId").value(1));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RouteTrajectoryResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.ROUTE_TRAJECTORY.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/route-trajectorie/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteTrajectoryResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.ROUTE_TRAJECTORY.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/route-trajectorie/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}