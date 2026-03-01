package com.keyin.aircraft;

import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class AircraftClient {

    private RestClient restClient;

    public List<Aircraft> getAllAircraft() {

        if (getRestClient() != null) {

            restClient.setURLRoot("http://localhost:8080/aircraft");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<Aircraft>>() {});
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