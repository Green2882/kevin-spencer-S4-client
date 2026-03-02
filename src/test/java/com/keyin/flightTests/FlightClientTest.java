package com.keyin.flightTests;

import com.keyin.common.RestClient;
import com.keyin.flight.Flight;
import com.keyin.flight.FlightClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class FlightClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllFlights() throws Exception {
        FlightClient flightClientUnderTest = new FlightClient();
        flightClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"flightNumber\":\"AC202\",\"airline\":\"Air Canada\"}]");

        List<Flight> flights = flightClientUnderTest.getAllFlights();

        Assertions.assertNotNull(flights);
        Assertions.assertEquals(1, flights.size());
        Assertions.assertEquals("AC202", flights.get(0).getFlightNumber());
    }
}
