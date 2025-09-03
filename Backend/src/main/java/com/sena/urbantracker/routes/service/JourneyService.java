package com.sena.urbantracker.routes.service;

import com.sena.urbantracker.routes.model.entity.Journey;
import com.sena.urbantracker.routes.repository.IJourney;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JourneyService {

    private IJourney iJourney;

    public List<Journey> getAllJourneys(){
        return iJourney.findAll();
    }
}
