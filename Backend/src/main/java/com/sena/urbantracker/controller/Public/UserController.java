package com.sena.urbantracker.controller.Public;

import com.sena.urbantracker.DTO.ResponseDTO;
import com.sena.urbantracker.DTO.UserDTO;
import com.sena.urbantracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/user")
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

