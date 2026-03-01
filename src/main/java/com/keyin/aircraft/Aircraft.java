package com.keyin.aircraft;

public class Aircraft {
    private Long id;
    private String type;
    private String airlineName;
    private String numOfPassengers;

    public Aircraft(String type, String airlineName, String numOfPassengers) {
        this.type = type;
        this.airlineName = airlineName;
        this.numOfPassengers = numOfPassengers;
    }

    public Aircraft() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public String getNumOfPassengers() {
        return numOfPassengers;
    }

    public void setNumOfPassengers(String numOfPassengers) {
        this.numOfPassengers = numOfPassengers;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
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
                ", airlineName='" + airlineName + '\'' +
                ", numOfPassengers='" + numOfPassengers + '\'' +
                '}';
    }
}

