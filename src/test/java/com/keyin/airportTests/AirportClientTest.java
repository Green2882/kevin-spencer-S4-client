package com.keyin.airportTests;

import com.keyin.airport.Airport;
import com.keyin.airport.AirportClient;
import com.keyin.common.RestClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class AirportClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllAirports() {

        AirportClient airportClientUnderTest = new AirportClient();
        airportClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"name\":\"Pearson International\",\"code\":\"YYZ\"}]");

        List<Airport> airports = airportClientUnderTest.getAllAirports();

        Assertions.assertNotNull(airports);
        Assertions.assertEquals(1, airports.size());
        Assertions.assertEquals("YYZ", airports.get(0).getCode());
    }
}
