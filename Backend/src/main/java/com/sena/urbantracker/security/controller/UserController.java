package com.sena.urbantracker.security.controller;

import com.sena.urbantracker.shared.model.dto.ResponseDTO;
import com.sena.urbantracker.security.model.dto.request.UserDTO;
import com.sena.urbantracker.users.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserProfileService userProfileService;

    @GetMapping("/")
    public ResponseEntity<?> getAllUsers() {
        return  ResponseEntity.ok(userProfileService.getAllUsers());
    }

    @PostMapping("/")
    public ResponseEntity<Object> createUser(@RequestBody UserDTO userDTO) {
        ResponseDTO response = userProfileService.save(userDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        ResponseDTO response = userProfileService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

