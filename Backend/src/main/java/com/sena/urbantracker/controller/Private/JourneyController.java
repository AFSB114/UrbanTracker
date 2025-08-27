package com.sena.urbantracker.controller.Private;

import com.sena.urbantracker.service.JourneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/journey")
@RequiredArgsConstructor
public class JourneyController {

    private final JourneyService journeyService;

    @GetMapping("/")
    public ResponseEntity<?> getAllJourneys() {
        return ResponseEntity.ok(journeyService.getAllJourneys());
    }
}
