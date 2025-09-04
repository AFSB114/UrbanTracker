package com.sena.urbantracker.routes.controller;

import com.sena.urbantracker.routes.iservice.IRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/route")
@RequiredArgsConstructor
public class RouteController {

    private final IRouteService routeService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRoutes() {
        return ResponseEntity.ok(routeService.getAllRoutes());
    }
}
