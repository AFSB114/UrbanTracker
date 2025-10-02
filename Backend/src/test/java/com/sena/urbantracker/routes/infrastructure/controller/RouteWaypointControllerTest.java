package com.sena.urbantracker.routes.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteWaypointResDto;
import com.sena.urbantracker.routes.application.service.RouteWaypointService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.application.service.ServiceFactory;
import com.sena.urbantracker.shared.domain.enums.EntityType;
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

@WebMvcTest(RouteWaypointController.class)
@WithMockUser
class RouteWaypointControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private RouteWaypointService routeWaypointService;

    @MockBean
    private CrudOperations<RouteWaypointReqDto, RouteWaypointResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RouteWaypointReqDto validReqDto;
    private RouteWaypointResDto resDto;
    private CrudResponseDto<RouteWaypointResDto> successResponse;
    private CrudResponseDto<Optional<RouteWaypointResDto>> findByIdResponse;
    private CrudResponseDto<List<RouteWaypointResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RouteWaypointReqDto.builder()
                .routeId(1L)
                .sequence(1)
                .latitude(4.60971)
                .longitude(-74.08175)
                .type("STOP")
                .destine("PICKUP")
                .build();

        resDto = RouteWaypointResDto.builder()
                .id(1L)
                .routeId(1L)
                .sequence(1)
                .latitude(4.60971)
                .longitude(-74.08175)
                .type("STOP")
                .destine("PICKUP")
                .build();

        successResponse = CrudResponseDto.success(resDto, "CREATED", "ROUTE_WAYPOINT");
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), "READ", "ROUTE_WAYPOINT");
        findAllResponse = CrudResponseDto.success(List.of(resDto), "READ", "ROUTE_WAYPOINT");

        when(serviceFactory.getService(EntityType.ROUTE_WAYPOINT, RouteWaypointReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/public/route-waypoint")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.sequence").value(1));
    }

    @Test
    void create_ShouldReturnBadRequest_WhenInvalidRequest() throws Exception {
        RouteWaypointReqDto invalidReqDto = RouteWaypointReqDto.builder()
                .sequence(null) // Invalid: null
                .build();

        mockMvc.perform(post("/api/v1/public/route-waypoint")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidReqDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/public/route-waypoint/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.sequence").value(1));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/public/route-waypoint"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].sequence").value(1));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RouteWaypointResDto> updateResponse = CrudResponseDto.success(resDto, "UPDATED", "ROUTE_WAYPOINT");
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/public/route-waypoint/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteWaypointResDto> deleteResponse = CrudResponseDto.success(null, "DELETED", "ROUTE_WAYPOINT");
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/public/route-waypoint/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void findByRouteId_ShouldReturnOk() throws Exception {
        CrudResponseDto<List<RouteWaypointReqDto>> response = CrudResponseDto.success(List.of(validReqDto), "READ", "ROUTE_WAYPOINT");
        when(routeWaypointService.findByRouteId(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/public/route-waypoint/route/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}