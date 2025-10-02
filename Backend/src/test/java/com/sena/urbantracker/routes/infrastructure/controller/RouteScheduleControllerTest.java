package com.sena.urbantracker.routes.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.routes.application.service.RouteScheduleService;
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

import java.sql.Time;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RouteScheduleController.class)
@WithMockUser(roles = "ADMIN")
class RouteScheduleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceFactory serviceFactory;

    @MockBean
    private RouteScheduleService routeScheduleService;

    @MockBean
    private CrudOperations<RouteScheduleReqDto, RouteScheduleResDto, Long> crudOperations;

    @Autowired
    private ObjectMapper objectMapper;

    private RouteScheduleReqDto validReqDto;
    private RouteScheduleResDto resDto;
    private CrudResponseDto<RouteScheduleResDto> successResponse;
    private CrudResponseDto<Optional<RouteScheduleResDto>> findByIdResponse;
    private CrudResponseDto<List<RouteScheduleResDto>> findAllResponse;

    @BeforeEach
    void setUp() {
        validReqDto = RouteScheduleReqDto.builder()
                .routeId(1L)
                .dayOfWeek("MONDAY")
                .startTime(Time.valueOf("08:00:00"))
                .endTime(Time.valueOf("18:00:00"))
                .build();

        resDto = RouteScheduleResDto.builder()
                .id(1L)
                .routeId(1L)
                .dayOfWeek("MONDAY")
                .startTime(Time.valueOf("08:00:00"))
                .endTime(Time.valueOf("18:00:00"))
                .build();

        successResponse = CrudResponseDto.success(resDto, OperationType.CREATE, EntityType.ROUTE_SCHEDULE.getDisplayName());
        findByIdResponse = CrudResponseDto.success(Optional.of(resDto), OperationType.READ, EntityType.ROUTE_SCHEDULE.getDisplayName());
        findAllResponse = CrudResponseDto.success(List.of(resDto), OperationType.READ, EntityType.ROUTE_SCHEDULE.getDisplayName());

        when(serviceFactory.getService(EntityType.ROUTE_SCHEDULE, RouteScheduleReqDto.class)).thenReturn(crudOperations);
    }

    @Test
    void create_ShouldReturnCreated_WhenValidRequest() throws Exception {
        when(crudOperations.create(validReqDto)).thenReturn(successResponse);

        mockMvc.perform(post("/api/v1/route-schedule")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.dayOfWeek").value("MONDAY"));
    }

    @Test
    void findById_ShouldReturnOk_WhenEntityExists() throws Exception {
        when(crudOperations.findById(1L)).thenReturn(findByIdResponse);

        mockMvc.perform(get("/api/v1/route-schedule/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.dayOfWeek").value("MONDAY"));
    }

    @Test
    void findAll_ShouldReturnOk() throws Exception {
        when(crudOperations.findAll()).thenReturn(findAllResponse);

        mockMvc.perform(get("/api/v1/route-schedule"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].dayOfWeek").value("MONDAY"));
    }

    @Test
    void update_ShouldReturnOk_WhenValidRequest() throws Exception {
        CrudResponseDto<RouteScheduleResDto> updateResponse = CrudResponseDto.success(resDto, OperationType.UPDATE, EntityType.ROUTE_SCHEDULE.getDisplayName());
        when(crudOperations.update(validReqDto, 1L)).thenReturn(updateResponse);

        mockMvc.perform(put("/api/v1/route-schedule/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validReqDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void delete_ShouldReturnOk() throws Exception {
        CrudResponseDto<RouteScheduleResDto> deleteResponse = CrudResponseDto.success(null, OperationType.DELETE, EntityType.ROUTE_SCHEDULE.getDisplayName());
        when(crudOperations.deleteById(1L)).thenReturn(deleteResponse);

        mockMvc.perform(delete("/api/v1/route-schedule/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void createAll_ShouldReturnCreated() throws Exception {
        List<RouteScheduleReqDto> dtoList = List.of(validReqDto);
        CrudResponseDto<List<RouteScheduleResDto>> response = CrudResponseDto.success(List.of(resDto), OperationType.CREATE, EntityType.ROUTE_SCHEDULE.getDisplayName());

        when(routeScheduleService.createAll(dtoList)).thenReturn(response);

        mockMvc.perform(post("/api/v1/route-schedule/bulk")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dtoList))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void updateAll_ShouldReturnAccepted() throws Exception {
        List<RouteScheduleReqDto> dtoList = List.of(validReqDto);
        CrudResponseDto<List<RouteScheduleResDto>> response = CrudResponseDto.success(List.of(resDto), OperationType.UPDATE, EntityType.ROUTE_SCHEDULE.getDisplayName());

        when(routeScheduleService.updateAll(dtoList, 1L)).thenReturn(response);

        mockMvc.perform(put("/api/v1/route-schedule/bulk/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dtoList))
                        .with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.success").value(true));
    }
}