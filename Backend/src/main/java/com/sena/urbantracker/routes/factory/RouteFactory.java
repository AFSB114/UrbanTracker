package com.sena.urbantracker.routes.factory;

import com.sena.urbantracker.routes.model.entity.Route;

/**
 * Factory interface for creating Route domain objects.
 */
public interface RouteFactory {
    Route create(Integer numberRoute, String description, Double totalDistance, Boolean active);
}
