package com.keyin.gate;

import com.keyin.airport.Airport;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class GateTest {

    @Test
    public void testGateConstructor() {
        Airport airport = new Airport("St. John's International", "YYT");
        Gate gate = new Gate("A1", airport);
        Assertions.assertNotNull(gate);
        Assertions.assertEquals("A1", gate.getGateNumber());
        Assertions.assertEquals(airport, gate.getAirport());
    }

    @Test
    public void testSettersAndGetters() {
        Gate gate = new Gate();
        gate.setId(10L);
        gate.setGateNumber("B12");

        Airport airport = new Airport("Toronto Pearson", "YYZ");
        gate.setAirport(airport);

        Assertions.assertEquals(10L, gate.getId());
        Assertions.assertEquals("B12", gate.getGateNumber());
        Assertions.assertEquals(airport, gate.getAirport());
    }
}
