package com.keyin.passengerTests;

import com.keyin.common.RestClient;
import com.keyin.passenger.Passenger;
import com.keyin.passenger.passengerClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class PassengerClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllPassengers() throws Exception {
        passengerClient passengerClientUnderTest = new passengerClient();
        passengerClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"firstName\":\"Kevin\",\"lastName\":\"Spencer\",\"phoneNumber\":\"709-111-1111\"}]");

        List<Passenger> passengers = passengerClientUnderTest.getAllPassengers();

        Assertions.assertNotNull(passengers);
        Assertions.assertEquals(1, passengers.size());
        Assertions.assertEquals("Kevin", passengers.get(0).getFirstName());
    }
}
