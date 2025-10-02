package com.sena.urbantracker.security.infrastructure.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.security.application.dto.request.ChangePasswordDTO;
import com.sena.urbantracker.security.application.dto.request.ForgotPassword;
import com.sena.urbantracker.security.application.dto.request.RecoveryCodeValidationDTO;
import com.sena.urbantracker.security.application.dto.request.RequestLoginAdminDTO;
import com.sena.urbantracker.security.application.dto.response.ForgotPasswordResponseDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.security.application.service.RecoveryService;
import com.sena.urbantracker.security.application.service.UserSecurityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserSecurityService userService;

    @MockBean
    private RecoveryService recoveryService;

    @Autowired
    private ObjectMapper objectMapper;

    private RequestLoginAdminDTO loginDto;
    private ResponseLoginDTO loginResponse;
    private ForgotPassword forgotPassword;
    private ForgotPasswordResponseDTO forgotResponse;
    private RecoveryCodeValidationDTO validationDto;
    private ChangePasswordDTO changePasswordDto;

    @BeforeEach
    void setUp() {
        loginDto = new RequestLoginAdminDTO();
        loginDto.setUserName("admin@example.com");
        loginDto.setPassword("password");

        loginResponse = new ResponseLoginDTO();
        loginResponse.setToken("jwt-token");

        forgotPassword = new ForgotPassword();
        forgotPassword.setEmail("admin@example.com");

        forgotResponse = new ForgotPasswordResponseDTO();
        forgotResponse.setMessage("Recovery code sent");

        validationDto = new RecoveryCodeValidationDTO();
        validationDto.setEmail("admin@example.com");
        validationDto.setCode("123456");

        changePasswordDto = new ChangePasswordDTO();
        changePasswordDto.setEmail("admin@example.com");
        changePasswordDto.setCode("123456");
        changePasswordDto.setNewPassword("newpassword");
    }

    @Test
    void login_ShouldReturnOk_WhenCredentialsAreValid() throws Exception {
        when(userService.loginAdmin(loginDto)).thenReturn(loginResponse);

        mockMvc.perform(post("/api/v1/public/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token"));
    }

    @Test
    void login_ShouldReturnUnauthorized_WhenCredentialsAreInvalid() throws Exception {
        when(userService.loginAdmin(loginDto)).thenThrow(new BadCredentialsException("Invalid credentials"));

        mockMvc.perform(post("/api/v1/public/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Credenciales incorrectas"));
    }

    @Test
    void forgot_ShouldReturnOk() throws Exception {
        when(recoveryService.generateRecoveryCode(forgotPassword)).thenReturn(ResponseEntity.ok(forgotResponse));

        mockMvc.perform(post("/api/v1/public/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(forgotPassword)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Recovery code sent"));
    }

    @Test
    void validateCode_ShouldReturnOk() throws Exception {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Code validated");
        when(recoveryService.validateRecoveryCode(validationDto)).thenReturn(ResponseEntity.ok(response));

        mockMvc.perform(post("/api/v1/public/auth/validate-code")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validationDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Code validated"));
    }

    @Test
    void changePassword_ShouldReturnOk() throws Exception {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password changed");
        when(recoveryService.changePassword(changePasswordDto)).thenReturn(ResponseEntity.ok(response));

        mockMvc.perform(post("/api/v1/public/auth/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(changePasswordDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Password changed"));
    }

    @Test
    void changePassword_ShouldReturnNotFound_WhenUserNotFound() throws Exception {
        when(recoveryService.changePassword(changePasswordDto)).thenThrow(new UsernameNotFoundException("User not found"));

        mockMvc.perform(post("/api/v1/public/auth/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(changePasswordDto)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Usuario no encontrado"));
    }

    @Test
    void validateToken_ShouldReturnOk_WhenTokenProvidedInHeader() throws Exception {
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        when(userService.validateToken("valid-token")).thenReturn(ResponseEntity.ok(response));

        mockMvc.perform(post("/api/v1/public/auth/validate-token")
                        .header("Authorization", "Bearer valid-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").value(true));
    }

    @Test
    void validateToken_ShouldReturnBadRequest_WhenNoToken() throws Exception {
        mockMvc.perform(post("/api/v1/public/auth/validate-token"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.valid").value(false));
    }
}