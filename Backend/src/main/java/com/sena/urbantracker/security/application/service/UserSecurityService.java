package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.RequestLoginAdminDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;

import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.security.domain.entity.UserDomain;

import com.sena.urbantracker.security.domain.repository.IUserRepository;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSecurityService {

    private static final Logger logger = LoggerFactory.getLogger(UserSecurityService.class);

    private final IUserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseLoginDTO loginAdmin(RequestLoginAdminDTO login) {
        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        // Buscar conductor por userName
        UserDomain user = userRepository.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Conductor no encontrado con ID: " + login.getUserName()));

        logger.info("Usuario encontrado: {} con rol: {}", user.getUsername(), user.getRole() != null ? user.getRole().getName() : "null");

        if (user.getRole() == null) {
            throw new RuntimeException("El usuario no tiene un rol asignado");
        }

        // Generar token
        String token = jwtService.generateToken(user);

        return new ResponseLoginDTO(token);
    }


    public ResponseLoginDTO loginDriver(RequestLoginAdminDTO login) {
        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        // Buscar conductor por userName
        UserDomain user = userRepository.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Conductor no encontrado con ID: " + login.getUserName()));

        // Generar token
        String token = jwtService.generateToken(user);

        return new ResponseLoginDTO(token);
    }

}
