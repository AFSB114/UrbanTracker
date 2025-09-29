package com.sena.urbantracker.security.infrastructure.controller;

import com.sena.urbantracker.security.application.dto.request.ChangePasswordDTO;
import com.sena.urbantracker.security.application.dto.request.ForgotPassword;
import com.sena.urbantracker.security.application.dto.request.RecoveryCodeValidationDTO;
import com.sena.urbantracker.security.application.dto.request.RequestLoginAdminDTO;
import com.sena.urbantracker.security.application.dto.response.ForgotPasswordResponseDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.security.application.service.RecoveryService;
import com.sena.urbantracker.security.application.service.UserSecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserSecurityService userService;
    private final RecoveryService recoveryService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestLoginAdminDTO userDTO) {
        try {
            ResponseLoginDTO response = userService.loginAdmin(userDTO);
            return ResponseEntity.ok(response);
            //tomo las exepciones en caso de que no se encuntre el nombre o alla errores en las crendenciales
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Credenciales incorrectas");
            error.put("message", "Usuario o contraseña inválidos");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno del servidor");
            error.put("message", "Por favor, intente nuevamente");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponseDTO> forgot(@RequestBody ForgotPassword forgot) {
        return recoveryService.generateRecoveryCode(forgot);
    }

    @PostMapping("/validate-code")
    public ResponseEntity<?> validateCode(@RequestBody RecoveryCodeValidationDTO dto) {
        return recoveryService.validateRecoveryCode(dto);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO dto) {
        try {
            return recoveryService.changePassword(dto);
        } catch (UsernameNotFoundException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Usuario no encontrado");
            error.put("message", "El email proporcionado no corresponde a ningún usuario");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno del servidor");
            error.put("message", "Por favor, intente nuevamente");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader,
            @RequestBody(required = false) Map<String, String> body
    ) {
        String token = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (body != null && body.get("token") != null) {
            token = body.get("token");
        }

        if (token == null || token.isBlank()) {
            Map<String, Object> res = new HashMap<>();
            res.put("valid", false);
            res.put("message", "Token no provisto");
            return ResponseEntity.badRequest().body(res);
        }

        Map<String, Object> res = userService.validateToken(token);
        return ResponseEntity.ok(res);
    }

}
