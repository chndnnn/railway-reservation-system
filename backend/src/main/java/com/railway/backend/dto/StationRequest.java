package com.railway.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StationRequest(

        @NotBlank(message = "Station name is required")
        String stationName,

        @NotBlank(message = "Station code is required")
        @Size(max = 10, message = "Station code cannot exceed 10 characters")
        String stationCode,

        @NotBlank(message = "City is required")
        String city,

        String state

) {}