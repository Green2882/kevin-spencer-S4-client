package com.keyin.flight;

import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class flightClient {

    private RestClient restClient;

    public List<Flight> getAllFlights() {

        if (getRestClient() != null) {

            restClient.setURLRoot("http://localhost:8080/airport");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<Flight>>() {});
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