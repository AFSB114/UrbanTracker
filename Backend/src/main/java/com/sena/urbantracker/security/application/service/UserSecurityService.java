package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.RequestLoginAdminDTO;
import com.sena.urbantracker.security.application.dto.response.ResponseLoginDTO;

import com.sena.urbantracker.security.domain.entity.User;

import com.sena.urbantracker.security.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSecurityService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseLoginDTO loginAdmin(RequestLoginAdminDTO login) {
        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        // Buscar conductor por userName
        User user = userRepository.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Conductor no encontrado con ID: " + login.getUserName()));

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
        User user = userRepository.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Conductor no encontrado con ID: " + login.getUserName()));

        // Generar token
        String token = jwtService.generateToken(user);

        return new ResponseLoginDTO(token);
    }

}
