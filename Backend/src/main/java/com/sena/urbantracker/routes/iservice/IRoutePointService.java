package com.sena.urbantracker.routes.iservice;

import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.model.entity.RouteWaypoint;

import java.util.List;

public interface IRoutePointService {
    List<RouteWaypoint> getAllRoutePoints();
    RouteWaypoint createAndSaveRoutePoint(Route route, Integer sequence, Double latitude, Double longitude);
}
