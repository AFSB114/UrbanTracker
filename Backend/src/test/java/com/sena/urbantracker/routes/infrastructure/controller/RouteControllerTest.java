package com.sena.urbantracker.routes.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteDetailsResDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.application.service.RouteService;
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

@WebMvcTest(RouteController.class)
@WithMockUser(roles = "ADMIN")
class RouteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private RouteService routeService;

    @MockBean
    private CrudOperations<RouteReqDto, RouteResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RouteReqDto validReqDto;
    private RouteResDto resDto;
    private CrudResponseDto<RouteResDto> successResponse;
    private CrudResponseDto<Optional<RouteResDto>> findByIdResponse;
    private CrudResponseDto<List<RouteResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RouteReqDto.builder()
                .numberRoute("Test Route")
                .description("A test route")
                .totalDistance("10km")
                .waypoints("[]")
                .build();

        resDto = RouteResDto.builder()
                .id(1L)
                .numberRoute("Test Route")
                .description("A test route")
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.ROUTE.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.ROUTE.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.ROUTE.getDisplayName());

        when(serviceFactory.getService(EntityType.ROUTE, RouteReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/route")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.numberRoute").value("Test Route"));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/route/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.numberRoute").value("Test Route"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/route"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].numberRoute").value("Test Route"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RouteResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.ROUTE.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/route/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.ROUTE.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/route/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void viewEdit_ShouldReturnRouteDetails() throws Exception {
        RouteDetailsResDto details = RouteDetailsResDto.builder()
                .id(1L)
                .numberRoute("Test Route")
                .build();
        CrudResponseDto<RouteDetailsResDto> response = CrudResponseDto.success(details, OperationType.READ, EntityType.ROUTE.getDisplayName());

        when(routeService.findByIdType(1L, "GEOMETRY")).thenReturn(response);

        mockMvc.perform(get("/api/v1/route/1/GEOMETRY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.numberRoute").value("Test Route"));
    }
}