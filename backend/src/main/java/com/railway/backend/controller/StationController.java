package com.railway.backend.controller;

import com.railway.backend.dto.StationRequest;
import com.railway.backend.dto.StationResponse;
import com.railway.backend.service.StationService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    // GET /api/stations
    @GetMapping
    public List<StationResponse> getAllStations() {

        return stationService.getAllStations();
    }

    // GET /api/stations/search?query=Mum
    @GetMapping("/search")
    public List<StationResponse> searchStations(
            @RequestParam String query
    ) {

        return stationService.searchStations(query);
    }

    // GET /api/stations/{id}
    @GetMapping("/{id}")
    public StationResponse getStationById(
            @PathVariable Long id
    ) {

        return stationService.getStationById(id);
    }

    // POST /api/stations
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StationResponse createStation(
            @Valid @RequestBody StationRequest request
    ) {

        return stationService.createStation(request);
    }
}