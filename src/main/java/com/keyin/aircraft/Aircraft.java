package com.keyin.aircraft;

import com.keyin.airline.Airline;

public class Aircraft {
    private Long id;
    private String type;
    private Airline airline;
    private String numOfPassengers;

    public Aircraft(String type, String airlineName, String numOfPassengers) {
        this.type = type;
        this.airline = new Airline(airlineName);
        this.numOfPassengers = numOfPassengers;
    }

    public Aircraft() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumOfPassengers() {
        return numOfPassengers;
    }

    public void setNumOfPassengers(String numOfPassengers) {
        this.numOfPassengers = numOfPassengers;
    }

    public void setAirline(Airline airline) {
        this.airline = airline;
    }

    public void setAirlineName(String airlineName) {
        this.airline = new Airline(airlineName);
    }

    public String getAirline() {
        return (airline != null) ? airline.getName() : null;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Aircraft{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", airlineName='" + (airline != null ? airline.getName() : null) + '\'' +
                ", numOfPassengers='" + numOfPassengers + '\'' +
                '}';
    }
}
