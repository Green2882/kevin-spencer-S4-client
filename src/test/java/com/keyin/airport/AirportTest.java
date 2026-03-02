package com.keyin.airport;

import com.keyin.city.City;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AirportTest {

    @Test
    public void testAirportConstructor() {
        Airport airport = new Airport("Pearson International", "YYZ");
        Assertions.assertEquals("Pearson International", airport.getName());
        Assertions.assertEquals("YYZ", airport.getCode());
    }

    @Test
    public void testSettersAndGetters() {
        Airport airport = new Airport();
        airport.setId(1L);
        airport.setName("St. John's International");
        airport.setCode("YYT");
        City city = new City();
        city.setId(1L);
        city.setName("St. John's");
        airport.setCity(city);

        Assertions.assertEquals(1L, airport.getId());
        Assertions.assertEquals("St. John's International", airport.getName());
        Assertions.assertEquals("YYT", airport.getCode());
        Assertions.assertEquals(city, airport.getCity());
    }

    @Test
    public void testToString() {
        Airport airport = new Airport("Pearson International", "YYZ");
        airport.setId(1L);
        String expected = "Airport{id='1', name='Pearson International', code='YYZ'}";
        Assertions.assertEquals(expected, airport.toString());
    }
}
