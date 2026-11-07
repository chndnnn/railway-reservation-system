package com.railway.backend.repository;

import com.railway.backend.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StationRepository extends JpaRepository<Station, Long> {
    List<Station> findByStationNameContainingIgnoreCaseOrCityContainingIgnoreCase(
            String stationName,
            String city
    );
}