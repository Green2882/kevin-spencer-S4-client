package com.keyin.airline;

import com.keyin.airport.Airport;
import com.keyin.flight.Flight;

public class Airline {
    private Long id;
    private String name;
    private Airport airport;
    private Flight flight;

    public Airline(String name) {
        this.name = name;
    }

    public Airline() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    @Override
    public String toString() {
        return "Airline{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
