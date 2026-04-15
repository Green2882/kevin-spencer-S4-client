package com.keyin.gateTests;

import com.keyin.common.RestClient;
import com.keyin.gate.Gate;
import com.keyin.gate.GateClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class GateClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllGates() {
        GateClient gateClientUnderTest = new GateClient();
        gateClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"gateNumber\":\"A1\",\"airport\":{\"name\":\"St. John's International\",\"code\":\"YYT\"}}]");

        List<Gate> gates = gateClientUnderTest.getAllGates();

        Assertions.assertNotNull(gates);
        Assertions.assertEquals(1, gates.size());
        Assertions.assertEquals("A1", gates.getFirst().getGateNumber());
        Assertions.assertEquals("YYT", gates.getFirst().getAirport().getCode());
    }
}
