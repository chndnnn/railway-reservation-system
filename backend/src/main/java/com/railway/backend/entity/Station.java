package com.railway.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stations")
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "station_name", nullable = false)
    private String stationName;

    @Column(name = "station_code", nullable = false, unique = true, length = 10)
    private String stationCode;

    @Column(nullable = false)
    private String city;

    private String state;

    // Default constructor required by JPA
    public Station() {
    }

    public Long getId() {
        return id;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getStationCode() {
        return stationCode;
    }

    public void setStationCode(String stationCode) {
        this.stationCode = stationCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}