package com.railway.backend.service;

import com.railway.backend.dto.StationRequest;
import com.railway.backend.dto.StationResponse;
import com.railway.backend.entity.Station;
import com.railway.backend.repository.StationRepository;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StationService {

    private final StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    // GET all stations
    @Transactional(readOnly = true)
    public List<StationResponse> getAllStations() {

        return stationRepository
                .findAll(Sort.by("stationName"))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET stations by name or city
    @Transactional(readOnly = true)
    public List<StationResponse> searchStations(String query) {

        return stationRepository
                .findByStationNameContainingIgnoreCaseOrCityContainingIgnoreCase(
                        query, query
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET station by ID
    @Transactional(readOnly = true)
    public StationResponse getStationById(Long id) {

        Station station = stationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Station not found with ID: " + id)
                );

        return mapToResponse(station);
    }

    // POST create station
    public StationResponse createStation(StationRequest request) {

        Station station = new Station();

        station.setStationName(request.stationName());
        station.setStationCode(request.stationCode().toUpperCase());
        station.setCity(request.city());
        station.setState(request.state());

        Station savedStation = stationRepository.save(station);

        return mapToResponse(savedStation);
    }

    // Convert Entity to Response DTO
    private StationResponse mapToResponse(Station station) {

        return new StationResponse(
                station.getId(),
                station.getStationName(),
                station.getStationCode(),
                station.getCity(),
                station.getState()
        );
    }
}