package com.sena.urbantracker.users.controller;

import com.sena.urbantracker.shared.model.dto.ResponseDTO;
import com.sena.urbantracker.security.model.dto.response.UserDTO;
import com.sena.urbantracker.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final  UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getAllUsers() {
        return  ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/")
    public ResponseEntity<Object> createUser(@RequestBody UserDTO userDTO) {
        ResponseDTO response = userService.save(userDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
        ResponseDTO response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

