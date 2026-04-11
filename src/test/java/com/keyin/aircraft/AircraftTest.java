package com.keyin.aircraft;

import com.keyin.airline.Airline;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AircraftTest {

    @Test
    public void testAircraftConstructor() {
        Aircraft aircraft = new Aircraft("A320", "Air Canada", "180");
        Assertions.assertEquals("A320", aircraft.getType());
        Assertions.assertEquals("Air Canada", aircraft.getAirline());
        Assertions.assertEquals("180", aircraft.getNumOfPassengers());
    }

    @Test
    public void testSettersAndGetters() {
        Aircraft aircraft = new Aircraft();
        aircraft.setId(1L);
        aircraft.setType("B737");
        Airline a1 = new Airline("WestJet");
        aircraft.setAirline(a1);
        aircraft.setNumOfPassengers("160");

        Assertions.assertEquals(1L, aircraft.getId());
        Assertions.assertEquals("B737", aircraft.getType());
        Assertions.assertEquals("WestJet", aircraft.getAirline());
        Assertions.assertEquals("160", aircraft.getNumOfPassengers());
    }

    @Test
    public void testToString() {
        Aircraft aircraft = new Aircraft("A320", "Air Canada", "180");
        aircraft.setId(1L);
        String expected = "Aircraft{id='1', type='A320', airlineName='Air Canada', numOfPassengers='180'}";
        Assertions.assertEquals(expected, aircraft.toString());
    }
}
