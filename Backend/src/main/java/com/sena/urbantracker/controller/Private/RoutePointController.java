package com.sena.urbantracker.controller.Private;


import com.sena.urbantracker.service.RoutePointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/route-point")
@RequiredArgsConstructor
public class RoutePointController {

    private final RoutePointService routePointService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRoutePoints() {
        return ResponseEntity.ok(routePointService.getAllRoutePoints());
    }
}
