package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.factory.RouteWaypointFactory;
import com.sena.urbantracker.routes.model.entity.Route;
import com.sena.urbantracker.routes.model.entity.RouteWaypoint;
import com.sena.urbantracker.routes.repository.IRoutePoint;
import com.sena.urbantracker.routes.iservice.IRoutePointService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoutePointService implements IRoutePointService {

    private final IRoutePoint iRoutePoint;
    private final RouteWaypointFactory routeWaypointFactory;

    public List<RouteWaypoint> getAllRoutePoints(){
        return iRoutePoint.findAll();
    }

    public RouteWaypoint createAndSaveRoutePoint(Route route, Integer sequence, Double latitude, Double longitude) {
        RouteWaypoint waypoint = routeWaypointFactory.create(route, sequence, latitude, longitude);
        return iRoutePoint.save(waypoint);
    }
}
