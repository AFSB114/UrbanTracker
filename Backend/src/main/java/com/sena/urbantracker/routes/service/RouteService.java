package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.factory.RouteFactory;
import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.repository.IRoute;
import com.sena.urbantracker.routes.iservice.IRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteService implements IRouteService {

    private final IRoute iRoute;
    private final RouteFactory routeFactory;

    public List<Route> getAllRoutes(){
        return iRoute.findAll();
    }

    public Route createAndSaveRoute(Integer numberRoute, String description, Double totalDistance, Boolean active) {
        Route route = routeFactory.create(numberRoute, description, totalDistance, active);
        return iRoute.save(route);
    }
}
