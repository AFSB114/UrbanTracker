package com.sena.urbantracker.monitoring.infrastructure.controller.mqtt;

import com.sena.urbantracker.monitoring.application.service.mqtt.DynamicSubscriptionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MqttDynamicController.class)
class MqttDynamicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DynamicSubscriptionService subscriptionService;

    @Test
    void subscribe_ShouldReturnSuccessMessage() throws Exception {
        doNothing().when(subscriptionService).subscribeToRouteTopic("test/topic");

        mockMvc.perform(post("/api/mqtt/dynamic/subscribe")
                        .param("topic", "test/topic")
                        .param("qos", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("✅ Suscrito dinámicamente a: test/topic"));
    }

    @Test
    void unsubscribe_ShouldReturnSuccessMessage() throws Exception {
        doNothing().when(subscriptionService).unsubscribeFromRouteTopic("test/topic");

        mockMvc.perform(post("/api/mqtt/dynamic/unsubscribe")
                        .param("topic", "test/topic"))
                .andExpect(status().isOk())
                .andExpect(content().string("❌ Suscripción cancelada: test/topic"));
    }
}