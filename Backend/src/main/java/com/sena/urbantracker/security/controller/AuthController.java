package com.sena.urbantracker.security.controller;

import com.sena.urbantracker.security.model.dto.request.ForgotPassword;
import com.sena.urbantracker.security.model.dto.request.RecoveryCodeValidationDTO;
import com.sena.urbantracker.security.model.dto.request.RequestLoginAdminDTO;
import com.sena.urbantracker.security.model.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.security.service.RecoveryService;
import com.sena.urbantracker.security.service.UserSecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<?> forgot(@RequestBody ForgotPassword forgot) {
        return recoveryService.generateRecoveryCode(forgot.getEmail());
    }

    @PostMapping("/validate-code")
    public ResponseEntity<?> validateCode(@RequestBody RecoveryCodeValidationDTO dto) {
        return recoveryService.validateRecoveryCode(dto);
    }

}
