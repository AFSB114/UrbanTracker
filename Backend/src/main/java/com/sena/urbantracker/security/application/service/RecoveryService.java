package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.RecoveryCodeValidationDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.security.domain.entity.RecoveryRequest;
import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.security.domain.repository.RecoveryRequestRepository;
import com.sena.urbantracker.users.application.mapper.UserProfileMapper;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class RecoveryService {

    private final UserProfileRepository userRepository;
    private final RecoveryRequestRepository recoveryRequestRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<?> generateRecoveryCode(String email) {

        Optional<UserProfileDomain> userOpt = userRepository.findByEmail(email);

        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El email no existe");
        }

        UserProfileDomain user = userOpt.get();

        // Eliminar cualquier código anterior de ese usuario
        recoveryRequestRepository.deleteAllByUser(user);

        // 1. Generar código
        String code = String.valueOf(new Random().nextInt(900000) + 100000);
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(20);

        // 2. Guardar solicitud
        RecoveryRequest request = new RecoveryRequest();
        request.setCode(passwordEncoder.encode(code));
        request.setExpirationTime(expiration);
        request.setUser(UserProfileMapper.toDto(user));
        recoveryRequestRepository.save(request);

        // 3. Enviar correo
        emailService.emailRecoveryPassword(user.getEmail(), user.getFirstName(), code);

        return ResponseEntity.ok("Se ha enviado un código de verificación al correo.");
    }

    public ResponseEntity<?> validateRecoveryCode(RecoveryCodeValidationDTO dto) {
        Optional<UserProfileDomain> userProfileOpt = userRepository.findByEmail(dto.getEmail());

        if (!userProfileOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email no encontrado.");
        }

        UserProfileDomain userProfile = userProfileOpt.get();

        Optional<RecoveryRequest> recoveryRequestOpt =
                recoveryRequestRepository.findTopByUserOrderByCreatedAtDesc(userProfile);

        if (!recoveryRequestOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró una solicitud de recuperación.");
        }

        RecoveryRequest recoveryRequest = recoveryRequestOpt.get();

        // Validar que el código ingresado sea correcto (comparando contra el hash)
        if (!passwordEncoder.matches(dto.getCode(), recoveryRequest.getCode())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("El código es inválido.");
        }

        if (recoveryRequest.getExpirationTime().isBefore(LocalDateTime.now())) {
            // código expirado y se elimina de la db
            recoveryRequestRepository.delete(recoveryRequest);
            return ResponseEntity.status(HttpStatus.GONE).body("El código ha expirado.");
        }

        // eliminamos el código verificado
        recoveryRequestRepository.delete(recoveryRequest);

        // aquí se obtiene el User que implementa UserDetails
        User user = userProfile.getUser();

        // Generar nuevo token
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(new ResponseLoginDTO(token));
    }

}
