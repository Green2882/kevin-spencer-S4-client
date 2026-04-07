package com.keyin.airlineTests;

import com.keyin.airline.Airline;
import com.keyin.airline.AirlineClient;
import com.keyin.common.RestClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class AirlineClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllAirlines() {

        AirlineClient airlineClientUnderTest = new AirlineClient();
        airlineClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"airlineName\":\"Air Canada\"}]");

        List<Airline> airlines = airlineClientUnderTest.getAllAirlines();

        Assertions.assertNotNull(airlines);
        Assertions.assertEquals(1, airlines.size());
        Assertions.assertEquals("Air Canada", airlines.getFirst().getName());
    }
}
