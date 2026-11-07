package com.railway.backend.dto;

public record StationResponse(
        Long id,
        String stationName,
        String stationCode,
        String city,
        String state
) {}