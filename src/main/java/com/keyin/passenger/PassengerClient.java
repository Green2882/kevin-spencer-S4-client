package com.keyin.passenger;

import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class PassengerClient {
    private RestClient restClient;

    public List<Passenger> getAllPassengers() {

        if (getRestClient() != null) {

            restClient.setURLRoot("http://localhost:8080/passengers");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<Passenger>>() {});
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
