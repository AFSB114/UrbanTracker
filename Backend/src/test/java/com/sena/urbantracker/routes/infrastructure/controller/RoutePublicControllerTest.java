package com.sena.urbantracker.routes.infrastructure.controller;

import com.sena.urbantracker.routes.application.dto.response.RouteDetailsResDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.application.service.RouteService;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RoutePublicController.class)
class RoutePublicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RouteService routeService;

    @Test
    void viewEdit_WithGeometry_ShouldReturnRouteDetails() throws Exception {
        RouteDetailsResDto details = RouteDetailsResDto.builder()
                .id(1L)
                .name("Test Route")
                .build();
        CrudResponseDto<RouteDetailsResDto> response = CrudResponseDto.success(details, "READ", "ROUTE");

        when(routeService.findByIdType(1L, "GEOMETRY")).thenReturn(response);

        mockMvc.perform(get("/api/v1/public/route/1/GEOMETRY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Test Route"));
    }

    @Test
    void viewEdit_ShouldReturnAllRoutes() throws Exception {
        RouteResDto route = RouteResDto.builder()
                .id(1L)
                .name("Test Route")
                .build();
        CrudResponseDto<List<RouteResDto>> response = CrudResponseDto.success(List.of(route), "READ", "ROUTE");

        when(routeService.findAll()).thenReturn(response);

        mockMvc.perform(get("/api/v1/public/route"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("Test Route"));
    }
}