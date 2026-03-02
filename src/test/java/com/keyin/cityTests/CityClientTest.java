package com.keyin.cityTests;

import com.keyin.city.City;
import com.keyin.city.CityClient;
import com.keyin.common.RestClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class CityClientTest {

    @Mock
    private RestClient mockRestClient;

    @Test
    public void testGetAllCities() {

        CityClient cityClientUnderTest = new CityClient();
        cityClientUnderTest.setRestClient(mockRestClient);

        Mockito.when(mockRestClient.sendGetRequest()).thenReturn(
                "[{\"id\":1,\"name\":\"St. John's\",\"state\":\"NL\"}]");

        List<City> cities = cityClientUnderTest.getAllCities();

        Assertions.assertNotNull(cities);
        Assertions.assertEquals(1, cities.size());
        Assertions.assertEquals("NL", cities.get(0).getState());
    }
}
