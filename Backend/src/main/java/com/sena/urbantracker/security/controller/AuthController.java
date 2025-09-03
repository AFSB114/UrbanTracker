package com.sena.urbantracker.security.controller;

import com.sena.urbantracker.security.model.dto.response.RequestLoginDriverDTO;
import com.sena.urbantracker.security.model.dto.response.ResponseLoginDTO;
import com.sena.urbantracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login/driver")
    public ResponseEntity<ResponseLoginDTO> login(@RequestBody RequestLoginDriverDTO userDTO) {
        ResponseLoginDTO response = userService.login(userDTO);
        return new ResponseEntity<ResponseLoginDTO>(response, HttpStatus.OK);
    }

}
