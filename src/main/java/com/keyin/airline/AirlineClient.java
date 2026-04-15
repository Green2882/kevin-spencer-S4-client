package com.keyin.airline;

import com.keyin.aircraft.Aircraft;
import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class AirlineClient {

    private RestClient restClient;

    public List<Airline> getAllAirlines() {

        if (getRestClient() != null) {

            restClient.setURLRoot("http://34.229.16.201:8080/airlines");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<Airline>>() {});
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
