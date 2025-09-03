package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.model.entity.RoutePoint;
import com.sena.urbantracker.routes.repository.IRoutePoint;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoutePointService {

    private IRoutePoint iRoutePoint;

    public List<RoutePoint> getAllRoutePoints(){
        return iRoutePoint.findAll();
    }
}
