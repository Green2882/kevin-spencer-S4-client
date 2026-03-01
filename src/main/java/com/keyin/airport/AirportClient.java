package com.keyin.airport;

import com.keyin.aircraft.Aircraft;
import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class AirportClient {

    private RestClient restClient;

    public List<Airport> getAllAirports() {

        if (getRestClient() != null) {

            restClient.setURLRoot("http://localhost:8080/airports");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<Airport>>() {});
        }

        return List.of();
    }

    public RestClient getRestClient() {
        return restClient;
    }

    public void setRestClient(RestClient restClient) {
        this.restClient = restClient;
    }
}
