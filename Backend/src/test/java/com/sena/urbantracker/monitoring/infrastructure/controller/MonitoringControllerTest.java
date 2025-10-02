package com.sena.urbantracker.monitoring.infrastructure.controller;

import com.sena.urbantracker.monitoring.application.dto.response.CoordinatesResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MonitoringController.class)
class MonitoringControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getCoordinates_ShouldReturnCoordinates() throws Exception {
        mockMvc.perform(get("/api/v1/monitoring/coordinates/testRoute"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.latitude").value(-74.08175))
                .andExpect(jsonPath("$.longitude").value(4.60971));
    }
}