package com.sena.urbantracker.controller.Public;

import com.sena.urbantracker.DTO.RequestLoginDriverDTO;
import com.sena.urbantracker.DTO.ResponseLoginDTO;
import com.sena.urbantracker.service.UserService;
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
