package com.sena.urbantracker.controller;

import com.sena.urbantracker.DTO.CompanyDTO;
import com.sena.urbantracker.DTO.ResponseDTO;
import com.sena.urbantracker.DTO.UserDTO;
import com.sena.urbantracker.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/")
    public ResponseEntity<?> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCompany(@PathVariable int id) {
        ResponseDTO response = companyService.deleteCompany(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createCompany(@RequestBody CompanyDTO companyDTO) {
        ResponseDTO response = companyService.save(companyDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
