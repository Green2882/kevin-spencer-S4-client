package com.keyin.gate;

import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
public class GateClient {

    private RestClient restClient;

    public List<Gate> getAllGates() {

        if (getRestClient() != null) {

            restClient.setURLRoot("http://34.229.16.201:8080/api/1.0.0/gates");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<Gate>>() {});
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
