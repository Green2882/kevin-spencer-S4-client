package com.keyin.aircraftTests;

import com.keyin.aircraft.Aircraft;
import com.keyin.aircraft.AircraftClient;
import com.keyin.common.RestClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class AircraftClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllAircraft(){

        AircraftClient aircraftClientUnderTest = new AircraftClient();
        aircraftClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"type\":\"A320\",\"airlineName\":\"" +
                        "Air Canada\",\"numOfPassengers\":\"180\",\"airports\":[]}]");

        List<Aircraft> aircrafts = aircraftClientUnderTest.getAllAircraft();

        Assertions.assertNotNull(aircrafts);
        Assertions.assertEquals(1,aircrafts.size());
        Assertions.assertEquals("Air Canada",aircrafts.get(0).getAirlineName());
    }
}
