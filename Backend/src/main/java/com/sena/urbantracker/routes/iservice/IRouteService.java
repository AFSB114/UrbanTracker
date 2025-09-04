package com.sena.urbantracker.routes.iservice;

import com.sena.urbantracker.routes.model.entity.Route;

import java.util.List;

public interface IRouteService {
    List<Route> getAllRoutes();
    Route createAndSaveRoute(Integer numberRoute, String description, Double totalDistance, Boolean active);
}
