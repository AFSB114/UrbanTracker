package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.ChangePasswordDTO;
import com.sena.urbantracker.security.application.dto.request.ForgotPassword;
import com.sena.urbantracker.security.application.dto.request.RecoveryCodeValidationDTO;
import com.sena.urbantracker.security.application.dto.response.ForgotPasswordResponseDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.security.domain.entity.RecoveryRequestDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RecoveryRequestRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.security.infrastructure.repository.impl.RecoveryRequestRepositoryImpl;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class RecoveryService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final RecoveryRequestRepository recoveryRequestRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final RecoveryRequestRepositoryImpl recoveryRequestRepositoryImpl;

    public String newMethodo(){
        return recoveryRequestRepositoryImpl.newMethodo();
    }

    @Transactional
    public ResponseEntity<ForgotPasswordResponseDTO> generateRecoveryCode(ForgotPassword forgot) {

        Optional<UserProfileDomain> userOpt = userProfileRepository.findByEmail(forgot.getEmail());

        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ForgotPasswordResponseDTO(false, "El email no existe", 404));
        }

        UserProfileDomain userProfile = userOpt.get();
        UserDomain user = userProfile.getUser();

        // Eliminar cualquier código anterior de ese usuario
        recoveryRequestRepository.deleteAllByUser(user);

        // 1. Generar código
        String code = String.valueOf(new Random().nextInt(900000) + 100000);
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(20);

        // 2. Guardar solicitud
        RecoveryRequestDomain request = RecoveryRequestDomain.builder()
                .code(passwordEncoder.encode(code))
                .expirationTime(expiration)
                .user(user)
                .build();
        recoveryRequestRepository.save(request);

        // 3. Enviar correo
        try {
            emailService.emailRecoveryPassword(userProfile.getEmail(), userProfile.getFirstName(), code);
        } catch (Exception e) {
            recoveryRequestRepository.delete(request);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ForgotPasswordResponseDTO(false, "Error al enviar el correo: " + e.getMessage(), 500));
        }

        return ResponseEntity.ok(new ForgotPasswordResponseDTO(true, "Codigo enviado", null));
    }

    public ResponseEntity<?> validateRecoveryCode(RecoveryCodeValidationDTO dto) {
        Optional<UserProfileDomain> userProfileOpt = userProfileRepository.findByEmail(dto.getEmail());

        if (!userProfileOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ForgotPasswordResponseDTO(false, "Email no encontrado.", 404));
        }

        UserProfileDomain userProfile = userProfileOpt.get();
        UserDomain user = userProfile.getUser();

        Optional<RecoveryRequestDomain> recoveryRequestOpt =
                recoveryRequestRepository.findTopByUserOrderByCreatedAtDesc(user);

        if (!recoveryRequestOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ForgotPasswordResponseDTO(false, "No se encontró una solicitud de recuperación.", 404));
        }

        RecoveryRequestDomain recoveryRequest = recoveryRequestOpt.get();

        // Validar que el código ingresado sea correcto (comparando contra el hash)
        if (!passwordEncoder.matches(dto.getCode(), recoveryRequest.getCode())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ForgotPasswordResponseDTO(false, "El código es inválido.", 401));
        }

        if (recoveryRequest.getExpirationTime().isBefore(LocalDateTime.now())) {
            // código expirado y se elimina de la db
            recoveryRequestRepository.delete(recoveryRequest);
            return ResponseEntity.status(HttpStatus.GONE)
                    .body(new ForgotPasswordResponseDTO(false, "El código ha expirado.", 410));
        }

        // eliminamos el código verificado
        recoveryRequestRepository.delete(recoveryRequest);

        // Generar nuevo token
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(new ResponseLoginDTO(token, null));
    }

    @Transactional
    public ResponseEntity<Map<String, Object>> changePassword(ChangePasswordDTO dto) {
        Optional<UserProfileDomain> userOpt = userProfileRepository.findByEmail(dto.getEmail());

        if (!userOpt.isPresent()) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        UserProfileDomain userProfile = userOpt.get();
        UserDomain user = userProfile.getUser();

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("success", true, "message", "Contraseña actualizada correctamente"));
    }
}
