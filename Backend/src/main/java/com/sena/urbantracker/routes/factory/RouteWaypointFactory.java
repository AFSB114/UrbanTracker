package com.sena.urbantracker.routes.factory;

import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.model.entity.RouteWaypoint;

/**
 * Factory interface for creating RouteWaypoint domain objects.
 */
public interface RouteWaypointFactory {
    RouteWaypoint create(Route route, Integer sequence, Double latitude, Double longitude);
}
