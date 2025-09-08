package com.sena.urbantracker.security.service;

import com.sena.urbantracker.security.model.dto.response.RequestLoginDriverDTO;
import com.sena.urbantracker.security.model.dto.response.ResponseLoginDTO;

import com.sena.urbantracker.security.model.entity.User;

import com.sena.urbantracker.security.repository.IUser;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSecurityService {

    private final IUser iUser;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseLoginDTO login(RequestLoginDriverDTO login) {
        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        // Buscar conductor por userName
        User user = iUser.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Conductor no encontrado con ID: " + login.getUserName()));

        // Generar token
        String token = jwtService.generateToken(user);

        return new ResponseLoginDTO(token);
    }

}
