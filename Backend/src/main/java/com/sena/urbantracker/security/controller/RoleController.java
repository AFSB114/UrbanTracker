package com.sena.urbantracker.security.controller;

import com.sena.urbantracker.security.model.dto.response.RoleDTO;
import com.sena.urbantracker.shared.model.dto.ResponseDTO;
import com.sena.urbantracker.users.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @PostMapping("/")
    public ResponseEntity<Object> createRole(@RequestBody RoleDTO roleDTO) {
        ResponseDTO response = roleService.save(roleDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable Long id) {
        ResponseDTO response = roleService.deleteRole(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
