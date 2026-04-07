package com.keyin.gate;

import com.keyin.airport.Airport;

public class Gate {
    private Long id;
    private String gateNumber;
    private Airport airport;

    public Gate() {}

    public Gate(String gateNumber, Airport airport) {
        this.gateNumber = gateNumber;
        this.airport = airport;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGateNumber() {
        return gateNumber;
    }

    public void setGateNumber(String gateNumber) {
        this.gateNumber = gateNumber;
    }

    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }

    @Override
    public String toString() {
        return "Gate{" +
                "id=" + id +
                ", gateNumber='" + gateNumber + '\'' +
                ", airport=" + airport +
                '}';
    }
}
