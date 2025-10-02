package com.sena.urbantracker.monitoring.infrastructure.controller.mqtt;

import com.sena.urbantracker.monitoring.application.service.mqtt.MqttPublisherService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MqttController.class)
class MqttControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MqttPublisherService publisherService;

    @Test
    void publish_ShouldReturnSuccessMessage() throws Exception {
        doNothing().when(publisherService).publish("test message");

        mockMvc.perform(post("/api/mqtt/publish")
                        .param("msg", "test message"))
                .andExpect(status().isOk())
                .andExpect(content().string("Mensaje MQTT enviado correctamente."));
    }
}