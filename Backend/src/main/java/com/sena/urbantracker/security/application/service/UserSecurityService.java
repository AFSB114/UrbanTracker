package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.RequestLoginAdminDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserSecurityService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public ResponseLoginDTO loginAdmin(RequestLoginAdminDTO login) {
        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        // Buscar usuario por userName
        UserDomain user = userRepository.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con userName: " + login.getUserName()));

        // Generar token
        String token = jwtService.generateToken(user);

        // Crear información del usuario para la respuesta
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("identificacion", user.getUsername());
        userInfo.put("email", null); // Email no disponible en UserDomain
        userInfo.put("role", user.getRole() != null ? user.getRole().getName() : null);

        return new ResponseLoginDTO(token, userInfo);
    }

    public Map<String, Object> validateToken(String token) {
        Map<String, Object> res = new HashMap<>();
        try {
            String username = jwtService.getUsernameFromToken(token);
            var userDetails = userDetailsService.loadUserByUsername(username);
            boolean valid = jwtService.isTokenValid(token, userDetails);

            res.put("valid", valid);
            if (valid) {
                res.put("username", username);
                res.put("role", jwtService.getRoleFromToken(token));
                Date exp = jwtService.getClaim(token, Claims::getExpiration);
                res.put("expiresAt", exp);
            } else {
                res.put("message", "Token inválido o expirado");
            }
        } catch (Exception e) {
            res.put("valid", false);
            res.put("message", "Token inválido");
        }
        return res;
    }

}
