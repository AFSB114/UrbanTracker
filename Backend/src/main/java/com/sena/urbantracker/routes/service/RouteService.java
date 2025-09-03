package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.repository.IRoute;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteService {

    private IRoute iRoute;

    public List<Route> getAllRoutes(){
        return iRoute.findAll();
    }
}
